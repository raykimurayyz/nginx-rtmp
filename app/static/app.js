const state = { destinations: [], status: null, editingId: null };

const elements = {
  dialog: document.querySelector('#destination-dialog'),
  form: document.querySelector('#destination-form'),
  list: document.querySelector('#destination-list'),
  empty: document.querySelector('#empty-state'),
  toast: document.querySelector('#toast'),
  save: document.querySelector('#save-destination'),
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

function showToast(message, error = false) {
  elements.toast.textContent = message;
  elements.toast.className = `toast show${error ? ' error' : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { elements.toast.className = 'toast'; }, 4200);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || `请求失败 (${response.status})`);
  return payload;
}

function renderDestinations() {
  elements.empty.hidden = state.destinations.length > 0;
  elements.list.innerHTML = state.destinations.map((item) => `
    <article class="destination-card${item.enabled ? '' : ' disabled'}" data-id="${item.id}">
      <div class="destination-name">
        <span class="platform-icon">${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
        <div><strong>${escapeHtml(item.name)}</strong><small>密钥 ${escapeHtml(item.streamKeyHint || '已保存')}</small></div>
      </div>
      <div class="destination-url"><strong>${escapeHtml(item.serverUrl)}</strong><small>RTMP 服务器</small></div>
      <span class="state-label${item.enabled ? ' enabled' : ''}">${item.enabled ? '● 已启用' : '○ 已停用'}</span>
      <div class="card-actions">
        <button type="button" data-action="toggle">${item.enabled ? '停用' : '启用'}</button>
        <button type="button" data-action="edit">编辑</button>
        <button class="delete" type="button" data-action="delete">删除</button>
      </div>
    </article>
  `).join('');
}

function openDialog(item = null) {
  state.editingId = item?.id || null;
  document.querySelector('#dialog-title').textContent = item ? '编辑推流平台' : '添加推流平台';
  document.querySelector('#destination-id').value = item?.id || '';
  document.querySelector('#destination-name').value = item?.name || '';
  document.querySelector('#server-url').value = item?.serverUrl || '';
  document.querySelector('#stream-key').value = '';
  document.querySelector('#stream-key').type = 'password';
  document.querySelector('#toggle-key').textContent = '显示';
  document.querySelector('#destination-enabled').checked = item?.enabled ?? true;
  document.querySelector('#stream-key').required = !item;
  document.querySelector('#key-help').textContent = item
    ? '留空会继续使用已经保存的串流密钥。'
    : '密钥只保存在本机 Docker 数据卷中。';
  elements.dialog.showModal();
  document.querySelector('#destination-name').focus();
}

function serializableDestinations() {
  return state.destinations.map((item) => ({
    id: item.id,
    name: item.name,
    serverUrl: item.serverUrl,
    streamKey: item.streamKey || '',
    enabled: item.enabled,
  }));
}

async function saveAll(destinations, successMessage) {
  const payload = await api('/api/config', {
    method: 'PUT',
    body: JSON.stringify({ destinations }),
  });
  state.destinations = payload.config.destinations;
  renderDestinations();
  showToast(payload.warning ? `${successMessage} ${payload.warning}` : successMessage);
  await refreshStatus();
}

async function handleFormSubmit(event) {
  if (event.submitter?.value === 'cancel') return;
  event.preventDefault();
  if (!elements.form.reportValidity()) return;
  const destination = {
    id: document.querySelector('#destination-id').value,
    name: document.querySelector('#destination-name').value.trim(),
    serverUrl: document.querySelector('#server-url').value.trim(),
    streamKey: document.querySelector('#stream-key').value,
    enabled: document.querySelector('#destination-enabled').checked,
  };
  const destinations = serializableDestinations();
  const index = destinations.findIndex((item) => item.id === destination.id);
  if (index >= 0) destinations[index] = destination;
  else destinations.push(destination);

  elements.save.disabled = true;
  elements.save.textContent = '正在应用…';
  try {
    await saveAll(destinations, '配置已保存。');
    elements.dialog.close();
  } catch (error) {
    showToast(error.message, true);
  } finally {
    elements.save.disabled = false;
    elements.save.textContent = '保存并应用';
  }
}

async function handleCardAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const card = button.closest('[data-id]');
  const item = state.destinations.find((destination) => destination.id === card.dataset.id);
  if (!item) return;
  if (button.dataset.action === 'edit') {
    openDialog(item);
    return;
  }
  if (button.dataset.action === 'delete' && !window.confirm(`确定删除“${item.name}”吗？`)) return;

  const destinations = serializableDestinations();
  if (button.dataset.action === 'delete') {
    destinations.splice(destinations.findIndex((destination) => destination.id === item.id), 1);
  } else {
    destinations.find((destination) => destination.id === item.id).enabled = !item.enabled;
  }
  try {
    await saveAll(destinations, button.dataset.action === 'delete' ? '平台已删除。' : '平台状态已更新。');
  } catch (error) {
    showToast(error.message, true);
  }
}

function formatRate(bytesPerSecond) {
  const bits = bytesPerSecond * 8;
  if (bits >= 1_000_000) return `${(bits / 1_000_000).toFixed(2)} Mbps`;
  if (bits >= 1_000) return `${(bits / 1_000).toFixed(0)} Kbps`;
  return `${bits} bps`;
}

function formatDuration(milliseconds) {
  const total = Math.floor(milliseconds / 1000);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

function renderStatus(status) {
  const online = status.nginx === 'online';
  const streams = status.activeStreams || [];
  document.querySelector('#connection-pill').className = `connection ${online ? 'online' : 'offline'}`;
  document.querySelector('#connection-text').textContent = online ? '服务运行正常' : 'Nginx 未连接';
  document.querySelector('#gateway-status').textContent = online ? '在线' : '离线';
  document.querySelector('#gateway-detail').textContent = online ? 'Nginx RTMP 正常运行' : '请查看容器日志';
  document.querySelector('#stream-count').textContent = streams.length;
  document.querySelector('#stream-detail').textContent = streams.length ? `正在接收 ${streams[0].name}` : '暂未收到直播';
  document.querySelector('#destination-count').textContent = status.enabledDestinations || 0;
  document.querySelector('#live-badge').textContent = streams.length ? '● 正在直播' : '等待直播流';
  document.querySelector('#live-badge').className = `live-badge${streams.length ? ' live' : ''}`;
  document.querySelector('#stream-panel').hidden = streams.length === 0;
  document.querySelector('#stream-list').innerHTML = streams.map((stream) => `
    <article class="stream-row">
      <div class="stream-value"><span>串流名称</span><strong>${escapeHtml(stream.name)}</strong></div>
      <div class="stream-value"><span>持续时间</span><strong>${formatDuration(stream.timeMs)}</strong></div>
      <div class="stream-value"><span>输入码率</span><strong>${formatRate(stream.bandwidthIn)}</strong></div>
      <div class="stream-value"><span>客户端</span><strong>${stream.clients}</strong></div>
    </article>
  `).join('');
}

async function refreshStatus() {
  try {
    state.status = await api('/api/status');
    renderStatus(state.status);
  } catch (error) {
    document.querySelector('#connection-pill').className = 'connection offline';
    document.querySelector('#connection-text').textContent = '管理服务连接失败';
  }
}

async function initialize() {
  const host = window.location.hostname || 'localhost';
  document.querySelector('#ingest-url').textContent = `rtmp://${host}:1935/live`;
  try {
    const config = await api('/api/config');
    state.destinations = config.destinations;
    renderDestinations();
  } catch (error) {
    showToast(error.message, true);
  }
  await refreshStatus();
  setInterval(refreshStatus, 5000);
}

document.querySelector('#add-destination').addEventListener('click', () => openDialog());
document.querySelector('#empty-add').addEventListener('click', () => openDialog());
elements.form.addEventListener('submit', handleFormSubmit);
elements.list.addEventListener('click', handleCardAction);
document.querySelector('#toggle-key').addEventListener('click', (event) => {
  const input = document.querySelector('#stream-key');
  input.type = input.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = input.type === 'password' ? '显示' : '隐藏';
});
document.querySelector('#copy-url').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#ingest-url').textContent);
    showToast('推流地址已复制。');
  } catch (_) {
    showToast('无法自动复制，请手动复制地址。', true);
  }
});

initialize();

