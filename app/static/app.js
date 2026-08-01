const TRANSLATIONS = {
  en: {
    'meta.description': 'A local dashboard for relaying one RTMP stream to multiple platforms.',
    'brand.homeAria': 'RTMP Relay Manager home',
    'language.label': 'Language',
    'hero.eyebrow': 'PRIVATE STREAM GATEWAY',
    'hero.titlePrimary': 'One live stream,',
    'hero.titleAccent': 'relayed everywhere.',
    'hero.description': 'Send your PS5, OBS, or another device here, then let Nginx RTMP securely relay it to every enabled platform.',
    'ingest.title': 'Local ingest URL',
    'ingest.waiting': 'Waiting for stream',
    'ingest.live': '● Live',
    'ingest.copy': 'Copy',
    'ingest.copyAria': 'Copy ingest URL',
    'ingest.description': 'Use this server URL in your streaming software. The stream name can be customized.',
    'metrics.ariaLabel': 'Runtime status',
    'metrics.gateway': 'Gateway status',
    'metrics.input': 'Input streams',
    'metrics.destinations': 'Enabled destinations',
    'metrics.destinationsDetail': 'Concurrent relay supported',
    'metrics.checking': 'Checking',
    'metrics.readingNginx': 'Reading Nginx status',
    'metrics.noStream': 'No live stream received',
    'metrics.receiving': 'Receiving {name}',
    'metrics.online': 'Online',
    'metrics.offline': 'Offline',
    'metrics.nginxHealthy': 'Nginx RTMP is running normally',
    'metrics.checkLogs': 'Check the container logs',
    'connection.connecting': 'Connecting',
    'connection.online': 'Service running normally',
    'connection.nginxOffline': 'Nginx disconnected',
    'connection.managerOffline': 'Manager connection failed',
    'workspace.eyebrow': 'DESTINATIONS',
    'workspace.title': 'Relay destinations',
    'workspace.description': 'Enter the RTMP server URL and stream key supplied by each platform.',
    'workspace.add': 'Add platform',
    'empty.title': 'No relay destinations yet',
    'empty.description': 'Add YouTube, Twitch, or any other platform that supports RTMP.',
    'empty.add': 'Add the first platform',
    'streams.eyebrow': 'LIVE INPUT',
    'streams.title': 'Current live streams',
    'streams.name': 'Stream name',
    'streams.duration': 'Duration',
    'streams.bitrate': 'Input bitrate',
    'streams.clients': 'Clients',
    'footer.security': 'Recommended for trusted local networks only',
    'footer.developedBy': 'Developed by',
    'footer.source': 'GitHub source',
    'footer.image': 'Docker Hub image',
    'dialog.eyebrow': 'DESTINATION',
    'dialog.addTitle': 'Add relay platform',
    'dialog.editTitle': 'Edit relay platform',
    'dialog.close': 'Close',
    'dialog.name': 'Platform name',
    'dialog.namePlaceholder': 'For example: YouTube',
    'dialog.server': 'RTMP server URL',
    'dialog.serverHelp': 'Enter the server URL supplied by the platform. RTMP is currently supported.',
    'dialog.key': 'Stream key',
    'dialog.keyPlaceholder': 'Enter the stream key supplied by the platform',
    'dialog.show': 'Show',
    'dialog.hide': 'Hide',
    'dialog.newKeyHelp': 'The key is stored only in the local Docker volume.',
    'dialog.editKeyHelp': 'Leave blank to keep the saved stream key.',
    'dialog.enabled': 'Enable now',
    'dialog.enabledHelp': 'Relay to this platform automatically when a stream arrives',
    'dialog.cancel': 'Cancel',
    'dialog.save': 'Save and apply',
    'dialog.saving': 'Applying…',
    'dialog.discardConfirm': 'Discard the unsaved changes?',
    'destination.savedKey': 'Key {hint}',
    'destination.saved': 'saved',
    'destination.server': 'RTMP server',
    'destination.enabled': '● Enabled',
    'destination.disabled': '○ Disabled',
    'destination.enable': 'Enable',
    'destination.disable': 'Disable',
    'destination.edit': 'Edit',
    'destination.delete': 'Delete',
    'destination.deleteConfirm': 'Delete “{name}”?',
    'toast.configSaved': 'Configuration saved.',
    'toast.deleted': 'Platform deleted.',
    'toast.stateUpdated': 'Platform status updated.',
    'toast.copied': 'Ingest URL copied.',
    'toast.copyFailed': 'Could not copy automatically. Please copy the URL manually.',
    'api.requestFailed': 'Request failed ({status})',
  },
  ja: {
    'meta.description': '1つのRTMP配信を複数のプラットフォームへ中継するローカル管理画面です。',
    'brand.homeAria': 'RTMP Relay Manager ホーム',
    'language.label': '言語',
    'hero.eyebrow': 'プライベート配信ゲートウェイ',
    'hero.titlePrimary': '1つのライブ配信を、',
    'hero.titleAccent': '複数のプラットフォームへ。',
    'hero.description': 'PS5、OBS、その他の機器から受信し、Nginx RTMPで有効な配信先へ安全に中継します。',
    'ingest.title': 'ローカル配信URL',
    'ingest.waiting': '配信待機中',
    'ingest.live': '● 配信中',
    'ingest.copy': 'コピー',
    'ingest.copyAria': '配信URLをコピー',
    'ingest.description': '配信ソフトにこのサーバーURLを入力してください。ストリーム名は自由に設定できます。',
    'metrics.ariaLabel': '稼働状況',
    'metrics.gateway': 'ゲートウェイ状態',
    'metrics.input': '入力ストリーム',
    'metrics.destinations': '有効な配信先',
    'metrics.destinationsDetail': '同時中継に対応',
    'metrics.checking': '確認中',
    'metrics.readingNginx': 'Nginxの状態を取得中',
    'metrics.noStream': 'ライブ配信はありません',
    'metrics.receiving': '{name} を受信中',
    'metrics.online': 'オンライン',
    'metrics.offline': 'オフライン',
    'metrics.nginxHealthy': 'Nginx RTMPは正常に稼働中',
    'metrics.checkLogs': 'コンテナログを確認してください',
    'connection.connecting': '接続中',
    'connection.online': 'サービスは正常に稼働中',
    'connection.nginxOffline': 'Nginxに接続できません',
    'connection.managerOffline': '管理サービスへの接続に失敗',
    'workspace.eyebrow': '配信先',
    'workspace.title': '中継先プラットフォーム',
    'workspace.description': '各プラットフォームから提供されたRTMPサーバーURLとストリームキーを入力します。',
    'workspace.add': '配信先を追加',
    'empty.title': '配信先がありません',
    'empty.description': 'YouTube、Twitch、その他RTMP対応の配信先を追加してください。',
    'empty.add': '最初の配信先を追加',
    'streams.eyebrow': 'ライブ入力',
    'streams.title': '現在のライブ配信',
    'streams.name': 'ストリーム名',
    'streams.duration': '配信時間',
    'streams.bitrate': '入力ビットレート',
    'streams.clients': 'クライアント',
    'footer.security': '信頼できるローカルネットワークでのみ使用してください',
    'footer.developedBy': '開発者',
    'footer.source': 'GitHub ソース',
    'footer.image': 'Docker Hub イメージ',
    'dialog.eyebrow': '配信先',
    'dialog.addTitle': '配信先を追加',
    'dialog.editTitle': '配信先を編集',
    'dialog.close': '閉じる',
    'dialog.name': 'プラットフォーム名',
    'dialog.namePlaceholder': '例：YouTube',
    'dialog.server': 'RTMPサーバーURL',
    'dialog.serverHelp': 'プラットフォームが提供するサーバーURLを入力してください。現在はRTMPに対応しています。',
    'dialog.key': 'ストリームキー',
    'dialog.keyPlaceholder': 'プラットフォームが提供するストリームキーを入力',
    'dialog.show': '表示',
    'dialog.hide': '非表示',
    'dialog.newKeyHelp': 'キーはローカルのDockerボリュームにのみ保存されます。',
    'dialog.editKeyHelp': '空欄のままにすると、保存済みのストリームキーを使用します。',
    'dialog.enabled': 'すぐに有効化',
    'dialog.enabledHelp': '配信を受信したら、このプラットフォームへ自動的に中継します',
    'dialog.cancel': 'キャンセル',
    'dialog.save': '保存して適用',
    'dialog.saving': '適用中…',
    'dialog.discardConfirm': '保存していない変更を破棄しますか？',
    'destination.savedKey': 'キー {hint}',
    'destination.saved': '保存済み',
    'destination.server': 'RTMPサーバー',
    'destination.enabled': '● 有効',
    'destination.disabled': '○ 無効',
    'destination.enable': '有効化',
    'destination.disable': '無効化',
    'destination.edit': '編集',
    'destination.delete': '削除',
    'destination.deleteConfirm': '「{name}」を削除しますか？',
    'toast.configSaved': '設定を保存しました。',
    'toast.deleted': '配信先を削除しました。',
    'toast.stateUpdated': '配信先の状態を更新しました。',
    'toast.copied': '配信URLをコピーしました。',
    'toast.copyFailed': '自動コピーに失敗しました。手動でURLをコピーしてください。',
    'api.requestFailed': 'リクエストに失敗しました（{status}）',
  },
  'zh-CN': {
    'meta.description': '局域网 RTMP 多平台转推管理面板',
    'brand.homeAria': 'RTMP Relay Manager 首页',
    'language.label': '语言',
    'hero.eyebrow': '私有直播网关',
    'hero.titlePrimary': '一条直播流，',
    'hero.titleAccent': '转推到多个平台。',
    'hero.description': '将 PS5、OBS 或其他设备推送到这里，再由 Nginx RTMP 安全转发到已启用的直播平台。',
    'ingest.title': '本机推流地址',
    'ingest.waiting': '等待直播流',
    'ingest.live': '● 正在直播',
    'ingest.copy': '复制',
    'ingest.copyAria': '复制推流地址',
    'ingest.description': '在推流软件中填写此服务器地址，串流名称可以自定义。',
    'metrics.ariaLabel': '运行状态',
    'metrics.gateway': '网关状态',
    'metrics.input': '输入直播流',
    'metrics.destinations': '启用的目的地',
    'metrics.destinationsDetail': '支持同时转推',
    'metrics.checking': '检查中',
    'metrics.readingNginx': '正在读取 Nginx 状态',
    'metrics.noStream': '暂未收到直播',
    'metrics.receiving': '正在接收 {name}',
    'metrics.online': '在线',
    'metrics.offline': '离线',
    'metrics.nginxHealthy': 'Nginx RTMP 正常运行',
    'metrics.checkLogs': '请查看容器日志',
    'connection.connecting': '正在连接',
    'connection.online': '服务运行正常',
    'connection.nginxOffline': 'Nginx 未连接',
    'connection.managerOffline': '管理服务连接失败',
    'workspace.eyebrow': '推流目的地',
    'workspace.title': '推流目的地',
    'workspace.description': '填写平台提供的 RTMP 服务器地址和串流密钥。',
    'workspace.add': '添加平台',
    'empty.title': '还没有推流目的地',
    'empty.description': '添加哔哩哔哩、斗鱼、虎牙或其他支持 RTMP 的直播平台。',
    'empty.add': '添加第一个平台',
    'streams.eyebrow': '直播输入',
    'streams.title': '当前直播流',
    'streams.name': '串流名称',
    'streams.duration': '持续时间',
    'streams.bitrate': '输入码率',
    'streams.clients': '客户端',
    'footer.security': '仅建议在可信局域网中使用',
    'footer.developedBy': '开发者',
    'footer.source': 'GitHub 源代码',
    'footer.image': 'Docker Hub 镜像',
    'dialog.eyebrow': '推流目的地',
    'dialog.addTitle': '添加推流平台',
    'dialog.editTitle': '编辑推流平台',
    'dialog.close': '关闭',
    'dialog.name': '平台名称',
    'dialog.namePlaceholder': '例如：哔哩哔哩',
    'dialog.server': 'RTMP 服务器地址',
    'dialog.serverHelp': '填写平台提供的服务器地址，目前支持 RTMP。',
    'dialog.key': '串流密钥',
    'dialog.keyPlaceholder': '填写平台提供的串流密钥',
    'dialog.show': '显示',
    'dialog.hide': '隐藏',
    'dialog.newKeyHelp': '密钥只保存在本机 Docker 数据卷中。',
    'dialog.editKeyHelp': '留空会继续使用已经保存的串流密钥。',
    'dialog.enabled': '立即启用',
    'dialog.enabledHelp': '收到直播流后自动向该平台转推',
    'dialog.cancel': '取消',
    'dialog.save': '保存并应用',
    'dialog.saving': '正在应用…',
    'dialog.discardConfirm': '确定放弃尚未保存的更改吗？',
    'destination.savedKey': '密钥 {hint}',
    'destination.saved': '已保存',
    'destination.server': 'RTMP 服务器',
    'destination.enabled': '● 已启用',
    'destination.disabled': '○ 已停用',
    'destination.enable': '启用',
    'destination.disable': '停用',
    'destination.edit': '编辑',
    'destination.delete': '删除',
    'destination.deleteConfirm': '确定删除“{name}”吗？',
    'toast.configSaved': '配置已保存。',
    'toast.deleted': '平台已删除。',
    'toast.stateUpdated': '平台状态已更新。',
    'toast.copied': '推流地址已复制。',
    'toast.copyFailed': '无法自动复制，请手动复制地址。',
    'api.requestFailed': '请求失败（{status}）',
  },
};

function normalizeLocale(locale) {
  const value = String(locale || '').toLowerCase();
  if (value.startsWith('zh')) return 'zh-CN';
  if (value.startsWith('ja')) return 'ja';
  return 'en';
}

function getInitialLocale() {
  try {
    return normalizeLocale(localStorage.getItem('relay-manager-locale') || navigator.language);
  } catch (_) {
    return normalizeLocale(navigator.language);
  }
}

const state = {
  destinations: [],
  status: null,
  editingId: null,
  dialogInitial: null,
  locale: getInitialLocale(),
  saving: false,
};

const elements = {
  dialog: document.querySelector('#destination-dialog'),
  form: document.querySelector('#destination-form'),
  list: document.querySelector('#destination-list'),
  empty: document.querySelector('#empty-state'),
  toast: document.querySelector('#toast'),
  save: document.querySelector('#save-destination'),
  cancel: document.querySelector('#cancel-destination'),
  close: document.querySelector('#close-dialog'),
  language: document.querySelector('#language-select'),
};

function t(key, variables = {}) {
  const template = TRANSLATIONS[state.locale]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(variables[name] ?? ''));
}

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
  if (!response.ok) throw new Error(payload.error || t('api.requestFailed', { status: response.status }));
  return payload;
}

function renderDestinations() {
  elements.empty.hidden = state.destinations.length > 0;
  elements.list.innerHTML = state.destinations.map((item) => `
    <article class="destination-card${item.enabled ? '' : ' disabled'}" data-id="${escapeHtml(item.id)}">
      <div class="destination-name">
        <span class="platform-icon">${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
        <div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(t('destination.savedKey', { hint: item.streamKeyHint || t('destination.saved') }))}</small></div>
      </div>
      <div class="destination-url"><strong>${escapeHtml(item.serverUrl)}</strong><small>${escapeHtml(t('destination.server'))}</small></div>
      <span class="state-label${item.enabled ? ' enabled' : ''}">${escapeHtml(t(item.enabled ? 'destination.enabled' : 'destination.disabled'))}</span>
      <div class="card-actions">
        <button type="button" data-action="toggle">${escapeHtml(t(item.enabled ? 'destination.disable' : 'destination.enable'))}</button>
        <button type="button" data-action="edit">${escapeHtml(t('destination.edit'))}</button>
        <button class="delete" type="button" data-action="delete">${escapeHtml(t('destination.delete'))}</button>
      </div>
    </article>
  `).join('');
}

function dialogSnapshot() {
  return JSON.stringify({
    name: document.querySelector('#destination-name').value,
    serverUrl: document.querySelector('#server-url').value,
    streamKey: document.querySelector('#stream-key').value,
    enabled: document.querySelector('#destination-enabled').checked,
  });
}

function updateDialogCopy() {
  document.querySelector('#dialog-title').textContent = t(state.editingId ? 'dialog.editTitle' : 'dialog.addTitle');
  document.querySelector('#key-help').textContent = t(state.editingId ? 'dialog.editKeyHelp' : 'dialog.newKeyHelp');
  const keyInput = document.querySelector('#stream-key');
  document.querySelector('#toggle-key').textContent = t(keyInput.type === 'password' ? 'dialog.show' : 'dialog.hide');
  if (!state.saving) elements.save.textContent = t('dialog.save');
}

function openDialog(item = null) {
  state.editingId = item?.id || null;
  document.querySelector('#destination-id').value = item?.id || '';
  document.querySelector('#destination-name').value = item?.name || '';
  document.querySelector('#server-url').value = item?.serverUrl || '';
  document.querySelector('#stream-key').value = '';
  document.querySelector('#stream-key').type = 'password';
  document.querySelector('#destination-enabled').checked = item?.enabled ?? true;
  document.querySelector('#stream-key').required = !item;
  updateDialogCopy();
  state.dialogInitial = dialogSnapshot();
  elements.dialog.showModal();
  document.querySelector('#destination-name').focus();
}

function requestDialogClose() {
  if (state.saving) return;
  const hasChanges = state.dialogInitial !== null && dialogSnapshot() !== state.dialogInitial;
  if (hasChanges && !window.confirm(t('dialog.discardConfirm'))) return;
  elements.dialog.close('cancel');
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

  state.saving = true;
  elements.save.disabled = true;
  elements.cancel.disabled = true;
  elements.close.disabled = true;
  elements.save.textContent = t('dialog.saving');
  try {
    await saveAll(destinations, t('toast.configSaved'));
    elements.dialog.close('saved');
  } catch (error) {
    showToast(error.message, true);
  } finally {
    state.saving = false;
    elements.save.disabled = false;
    elements.cancel.disabled = false;
    elements.close.disabled = false;
    elements.save.textContent = t('dialog.save');
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
  if (button.dataset.action === 'delete' && !window.confirm(t('destination.deleteConfirm', { name: item.name }))) return;

  const destinations = serializableDestinations();
  if (button.dataset.action === 'delete') {
    destinations.splice(destinations.findIndex((destination) => destination.id === item.id), 1);
  } else {
    destinations.find((destination) => destination.id === item.id).enabled = !item.enabled;
  }
  try {
    await saveAll(destinations, t(button.dataset.action === 'delete' ? 'toast.deleted' : 'toast.stateUpdated'));
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
  document.querySelector('#connection-text').textContent = t(online ? 'connection.online' : 'connection.nginxOffline');
  document.querySelector('#gateway-status').textContent = t(online ? 'metrics.online' : 'metrics.offline');
  document.querySelector('#gateway-detail').textContent = t(online ? 'metrics.nginxHealthy' : 'metrics.checkLogs');
  document.querySelector('#stream-count').textContent = streams.length;
  document.querySelector('#stream-detail').textContent = streams.length ? t('metrics.receiving', { name: streams[0].name }) : t('metrics.noStream');
  document.querySelector('#destination-count').textContent = status.enabledDestinations || 0;
  document.querySelector('#live-badge').textContent = t(streams.length ? 'ingest.live' : 'ingest.waiting');
  document.querySelector('#live-badge').className = `live-badge${streams.length ? ' live' : ''}`;
  document.querySelector('#stream-panel').hidden = streams.length === 0;
  document.querySelector('#stream-list').innerHTML = streams.map((stream) => `
    <article class="stream-row">
      <div class="stream-value"><span>${escapeHtml(t('streams.name'))}</span><strong>${escapeHtml(stream.name)}</strong></div>
      <div class="stream-value"><span>${escapeHtml(t('streams.duration'))}</span><strong>${formatDuration(stream.timeMs)}</strong></div>
      <div class="stream-value"><span>${escapeHtml(t('streams.bitrate'))}</span><strong>${formatRate(stream.bandwidthIn)}</strong></div>
      <div class="stream-value"><span>${escapeHtml(t('streams.clients'))}</span><strong>${stream.clients}</strong></div>
    </article>
  `).join('');
}

function renderPendingStatus() {
  document.querySelector('#connection-text').textContent = t('connection.connecting');
  document.querySelector('#gateway-status').textContent = t('metrics.checking');
  document.querySelector('#gateway-detail').textContent = t('metrics.readingNginx');
  document.querySelector('#stream-detail').textContent = t('metrics.noStream');
  document.querySelector('#live-badge').textContent = t('ingest.waiting');
}

function applyLanguage(locale) {
  state.locale = normalizeLocale(locale);
  document.documentElement.lang = state.locale;
  elements.language.value = state.locale;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  ['placeholder', 'aria-label', 'title', 'content'].forEach((attribute) => {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
      element.setAttribute(attribute, t(element.dataset[`i18n${attribute.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')}`]));
    });
  });
  try { localStorage.setItem('relay-manager-locale', state.locale); } catch (_) { /* Storage may be unavailable. */ }
  renderDestinations();
  updateDialogCopy();
  if (state.status) renderStatus(state.status);
  else renderPendingStatus();
}

async function refreshStatus() {
  try {
    state.status = await api('/api/status');
    renderStatus(state.status);
  } catch (error) {
    document.querySelector('#connection-pill').className = 'connection offline';
    document.querySelector('#connection-text').textContent = t('connection.managerOffline');
  }
}

async function initialize() {
  applyLanguage(state.locale);
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
elements.cancel.addEventListener('click', requestDialogClose);
elements.close.addEventListener('click', requestDialogClose);
elements.dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  requestDialogClose();
});
elements.dialog.addEventListener('close', () => {
  state.editingId = null;
  state.dialogInitial = null;
});
elements.language.addEventListener('change', (event) => applyLanguage(event.currentTarget.value));
document.querySelector('#toggle-key').addEventListener('click', (event) => {
  const input = document.querySelector('#stream-key');
  input.type = input.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = t(input.type === 'password' ? 'dialog.show' : 'dialog.hide');
});
document.querySelector('#copy-url').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#ingest-url').textContent);
    showToast(t('toast.copied'));
  } catch (_) {
    showToast(t('toast.copyFailed'), true);
  }
});

initialize();
