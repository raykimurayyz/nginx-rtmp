const TRANSLATIONS = {
  en: {
    'meta.description': 'A local dashboard for relaying one RTMP stream to multiple platforms.',
    'brand.homeAria': 'RTMP Relay Manager home',
    'language.label': 'Language',
    'hero.eyebrow': 'PRIVATE STREAM GATEWAY',
    'hero.titlePrimary': 'One live stream,',
    'hero.titleAccent': 'relayed everywhere.',
    'hero.description': 'Send video from OBS, a game-console setup, a camera, or any other RTMP source, then securely relay it to every enabled platform.',
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
    'streams.eyebrow': 'RTMP STATISTICS',
    'streams.title': 'RTMP runtime status',
    'streams.none': 'No active live streams.',
    'streams.uptime': 'Nginx uptime',
    'streams.accepted': 'Accepted connections',
    'streams.globalIn': 'Total input rate',
    'streams.globalOut': 'Total output rate',
    'streams.totalReceived': 'Total received',
    'streams.totalSent': 'Total sent',
    'streams.name': 'Stream name',
    'streams.state': 'State',
    'streams.active': 'Active',
    'streams.idle': 'Idle',
    'streams.duration': 'Duration',
    'streams.inputRate': 'Input bitrate',
    'streams.outputRate': 'Output bitrate',
    'streams.received': 'Received',
    'streams.sent': 'Sent',
    'streams.clients': 'Clients',
    'streams.mediaDetails': 'Media details',
    'streams.video': 'Video',
    'streams.audio': 'Audio',
    'streams.codec': 'Codec',
    'streams.resolution': 'Resolution',
    'streams.frameRate': 'Frame rate',
    'streams.sampleRate': 'Sample rate',
    'streams.channels': 'Channels',
    'streams.bitrate': 'Bitrate',
    'streams.connectionDetails': 'Connection details',
    'streams.showFullIps': 'Show full IPs',
    'streams.hideFullIps': 'Hide full IPs',
    'streams.connectionId': 'ID',
    'streams.role': 'Role',
    'streams.address': 'Client IP',
    'streams.connectionState': 'Connection',
    'streams.dropped': 'Dropped',
    'streams.avSync': 'A/V sync',
    'streams.publishing': 'Publishing input',
    'streams.playing': 'Playing / relay',
    'streams.connected': 'Connected',
    'streams.inactive': 'Inactive',
    'streams.noConnections': 'No connection details available.',
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
    'hero.description': 'OBS、PlayStationやXboxなどのゲーム機環境、カメラ、その他のRTMP映像ソースから受信し、有効な配信先へ安全に中継します。',
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
    'streams.eyebrow': 'RTMP 統計',
    'streams.title': 'RTMP 稼働状況',
    'streams.none': '現在ライブ配信はありません。',
    'streams.uptime': 'Nginx 稼働時間',
    'streams.accepted': '累計接続数',
    'streams.globalIn': '入力合計レート',
    'streams.globalOut': '出力合計レート',
    'streams.totalReceived': '累計受信量',
    'streams.totalSent': '累計送信量',
    'streams.name': 'ストリーム名',
    'streams.state': '状態',
    'streams.active': 'アクティブ',
    'streams.idle': '待機中',
    'streams.duration': '配信時間',
    'streams.inputRate': '入力ビットレート',
    'streams.outputRate': '出力ビットレート',
    'streams.received': '受信量',
    'streams.sent': '送信量',
    'streams.clients': 'クライアント',
    'streams.mediaDetails': 'メディア詳細',
    'streams.video': 'ビデオ',
    'streams.audio': 'オーディオ',
    'streams.codec': 'コーデック',
    'streams.resolution': '解像度',
    'streams.frameRate': 'フレームレート',
    'streams.sampleRate': 'サンプリングレート',
    'streams.channels': 'チャンネル',
    'streams.bitrate': 'ビットレート',
    'streams.connectionDetails': '接続詳細',
    'streams.showFullIps': '完全な IP を表示',
    'streams.hideFullIps': 'IP をマスク',
    'streams.connectionId': 'ID',
    'streams.role': '種別',
    'streams.address': 'クライアント IP',
    'streams.connectionState': '接続状態',
    'streams.dropped': 'ドロップ',
    'streams.avSync': 'A/V 同期',
    'streams.publishing': '入力配信',
    'streams.playing': '再生 / 中継',
    'streams.connected': '接続中',
    'streams.inactive': '非アクティブ',
    'streams.noConnections': '接続詳細はありません。',
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
    'hero.description': '从 OBS、PlayStation 或 Xbox 等游戏主机方案、摄像机及其他 RTMP 视频源接收直播，再安全转推到所有已启用的平台。',
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
    'streams.eyebrow': 'RTMP 统计',
    'streams.title': 'RTMP 运行状态',
    'streams.none': '当前没有活动的直播流。',
    'streams.uptime': 'Nginx 运行时间',
    'streams.accepted': '累计接受连接',
    'streams.globalIn': '总输入码率',
    'streams.globalOut': '总输出码率',
    'streams.totalReceived': '累计接收',
    'streams.totalSent': '累计发送',
    'streams.name': '串流名称',
    'streams.state': '状态',
    'streams.active': '活动',
    'streams.idle': '空闲',
    'streams.duration': '持续时间',
    'streams.inputRate': '输入码率',
    'streams.outputRate': '输出码率',
    'streams.received': '已接收',
    'streams.sent': '已发送',
    'streams.clients': '客户端',
    'streams.mediaDetails': '媒体详情',
    'streams.video': '视频',
    'streams.audio': '音频',
    'streams.codec': '编码',
    'streams.resolution': '分辨率',
    'streams.frameRate': '帧率',
    'streams.sampleRate': '采样率',
    'streams.channels': '声道数',
    'streams.bitrate': '码率',
    'streams.connectionDetails': '连接详情',
    'streams.showFullIps': '显示完整 IP',
    'streams.hideFullIps': '隐藏完整 IP',
    'streams.connectionId': 'ID',
    'streams.role': '连接类型',
    'streams.address': '客户端 IP',
    'streams.connectionState': '连接状态',
    'streams.dropped': '丢帧',
    'streams.avSync': '音画同步',
    'streams.publishing': '输入推流',
    'streams.playing': '播放 / 转推',
    'streams.connected': '已连接',
    'streams.inactive': '未活动',
    'streams.noConnections': '暂无连接详情。',
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

function getBrowserLocale() {
  return normalizeLocale(navigator.languages?.[0] || navigator.language);
}

function saveUiSettings(settings) {
  try {
    localStorage.setItem('relay-manager-ui-settings', JSON.stringify(settings));
    localStorage.removeItem('relay-manager-locale');
  } catch (_) { /* Storage may be unavailable. */ }
}

function loadUiSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('relay-manager-ui-settings') || '{}');
    const legacyLocale = localStorage.getItem('relay-manager-locale');
    const settings = { locale: normalizeLocale(stored.locale || legacyLocale || getBrowserLocale()) };
    saveUiSettings(settings);
    return settings;
  } catch (_) {
    const settings = { locale: getBrowserLocale() };
    saveUiSettings(settings);
    return settings;
  }
}

const uiSettings = loadUiSettings();

const state = {
  destinations: [],
  status: null,
  editingId: null,
  dialogInitial: null,
  locale: uiSettings.locale,
  saving: false,
  revealClientIps: false,
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

function formatRate(bitsPerSecond) {
  const bits = Number(bitsPerSecond) || 0;
  if (bits >= 1_000_000_000) return `${(bits / 1_000_000_000).toFixed(2)} Gbps`;
  if (bits >= 1_000_000) return `${(bits / 1_000_000).toFixed(2)} Mbps`;
  if (bits >= 1_000) return `${(bits / 1_000).toFixed(0)} Kbps`;
  return `${bits} bps`;
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes <= 0) return '0 B';
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const amount = bytes / (1024 ** unit);
  return `${amount.toFixed(unit === 0 ? 0 : amount >= 100 ? 0 : amount >= 10 ? 1 : 2)} ${units[unit]}`;
}

function formatDuration(milliseconds) {
  const total = Math.floor(milliseconds / 1000);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

function formatRuntimeDuration(seconds) {
  const days = Math.floor((Number(seconds) || 0) / 86400);
  const remainder = (Number(seconds) || 0) % 86400;
  const duration = formatDuration(remainder * 1000);
  return days ? `${days}d ${duration}` : duration;
}

function formatOptional(value, formatter = (item) => item) {
  return value === null || value === undefined || value === '' ? '—' : formatter(value);
}

function formatCodec(media) {
  return [media?.codec, media?.profile, media?.level].filter(Boolean).join(' ') || '—';
}

function formatResolution(video) {
  return video?.width && video?.height ? `${video.width} × ${video.height}` : '—';
}

function maskIp(address) {
  if (!address) return '—';
  if (address.includes('.')) return address.replace(/(\d+)(?!.*\d)/, '***');
  if (address.includes(':')) {
    const visible = address.split(':').filter(Boolean).slice(0, 3);
    return `${visible.join(':') || '::'}:${visible.length ? '' : ':'}****`;
  }
  return address;
}

function captureOpenStreamDetails() {
  return new Set([...document.querySelectorAll('#stream-list details[open]')]
    .map((detail) => `${detail.closest('[data-stream-index]')?.dataset.streamIndex}:${detail.dataset.detail}`));
}

function restoreOpenStreamDetails(openDetails) {
  document.querySelectorAll('#stream-list details').forEach((detail) => {
    const key = `${detail.closest('[data-stream-index]')?.dataset.streamIndex}:${detail.dataset.detail}`;
    detail.open = openDetails.has(key);
  });
}

function renderRuntime(runtime = {}) {
  document.querySelector('#runtime-versions').textContent = [
    runtime.nginxVersion ? `Nginx ${runtime.nginxVersion}` : null,
    runtime.rtmpVersion ? `nginx-rtmp ${runtime.rtmpVersion}` : null,
  ].filter(Boolean).join(' · ');
  document.querySelector('#rtmp-summary').innerHTML = `
    <div class="runtime-value"><span>${escapeHtml(t('streams.uptime'))}</span><strong>${formatRuntimeDuration(runtime.uptimeSeconds)}</strong></div>
    <div class="runtime-value"><span>${escapeHtml(t('streams.accepted'))}</span><strong>${runtime.acceptedConnections || 0}</strong></div>
    <div class="runtime-value"><span>${escapeHtml(t('streams.globalIn'))}</span><strong>${formatRate(runtime.bandwidthIn)}</strong></div>
    <div class="runtime-value"><span>${escapeHtml(t('streams.globalOut'))}</span><strong>${formatRate(runtime.bandwidthOut)}</strong></div>
    <div class="runtime-value"><span>${escapeHtml(t('streams.totalReceived'))}</span><strong>${formatBytes(runtime.bytesIn)}</strong></div>
    <div class="runtime-value"><span>${escapeHtml(t('streams.totalSent'))}</span><strong>${formatBytes(runtime.bytesOut)}</strong></div>
  `;
}

function renderMediaDetails(stream) {
  const video = stream.video || {};
  const audio = stream.audio || {};
  return `
    <details class="stream-details" data-detail="media">
      <summary>${escapeHtml(t('streams.mediaDetails'))}</summary>
      <div class="media-grid">
        <section class="media-card">
          <h4>${escapeHtml(t('streams.video'))}</h4>
          <dl>
            <div><dt>${escapeHtml(t('streams.codec'))}</dt><dd>${escapeHtml(formatCodec(video))}</dd></div>
            <div><dt>${escapeHtml(t('streams.resolution'))}</dt><dd>${escapeHtml(formatResolution(video))}</dd></div>
            <div><dt>${escapeHtml(t('streams.frameRate'))}</dt><dd>${escapeHtml(formatOptional(video.frameRate, (value) => `${value} fps`))}</dd></div>
            <div><dt>${escapeHtml(t('streams.bitrate'))}</dt><dd>${escapeHtml(formatOptional(video.bitrate, formatRate))}</dd></div>
          </dl>
        </section>
        <section class="media-card">
          <h4>${escapeHtml(t('streams.audio'))}</h4>
          <dl>
            <div><dt>${escapeHtml(t('streams.codec'))}</dt><dd>${escapeHtml(formatCodec(audio))}</dd></div>
            <div><dt>${escapeHtml(t('streams.sampleRate'))}</dt><dd>${escapeHtml(formatOptional(audio.sampleRate, (value) => `${(value / 1000).toFixed(value % 1000 ? 1 : 0)} kHz`))}</dd></div>
            <div><dt>${escapeHtml(t('streams.channels'))}</dt><dd>${escapeHtml(formatOptional(audio.channels))}</dd></div>
            <div><dt>${escapeHtml(t('streams.bitrate'))}</dt><dd>${escapeHtml(formatOptional(audio.bitrate, formatRate))}</dd></div>
          </dl>
        </section>
      </div>
    </details>
  `;
}

function renderConnectionDetails(stream) {
  const connections = stream.connections || [];
  const rows = connections.map((connection) => `
    <tr>
      <td data-label="${escapeHtml(t('streams.connectionId'))}">${escapeHtml(connection.id)}</td>
      <td data-label="${escapeHtml(t('streams.role'))}">${escapeHtml(t(`streams.${connection.role}`))}</td>
      <td data-label="${escapeHtml(t('streams.address'))}" class="client-address">${escapeHtml(state.revealClientIps ? connection.address || '—' : maskIp(connection.address))}</td>
      <td data-label="${escapeHtml(t('streams.connectionState'))}"><span class="connection-state${connection.active ? ' active' : ''}">${escapeHtml(t(connection.active ? 'streams.connected' : 'streams.inactive'))}</span></td>
      <td data-label="${escapeHtml(t('streams.duration'))}">${formatDuration(connection.timeMs)}</td>
      <td data-label="${escapeHtml(t('streams.dropped'))}">${connection.dropped || 0}</td>
      <td data-label="${escapeHtml(t('streams.avSync'))}">${escapeHtml(formatOptional(connection.avSyncMs, (value) => `${value} ms`))}</td>
    </tr>
  `).join('');
  return `
    <details class="stream-details" data-detail="connections">
      <summary>${escapeHtml(t('streams.connectionDetails'))} <span>${connections.length}</span></summary>
      <div class="connection-toolbar">
        <button class="secondary-button ip-toggle" type="button" data-action="toggle-ips" aria-pressed="${state.revealClientIps}">
          ${escapeHtml(t(state.revealClientIps ? 'streams.hideFullIps' : 'streams.showFullIps'))}
        </button>
      </div>
      ${connections.length ? `
        <div class="connection-table-wrap">
          <table class="connection-table">
            <thead><tr>
              <th>${escapeHtml(t('streams.connectionId'))}</th><th>${escapeHtml(t('streams.role'))}</th>
              <th>${escapeHtml(t('streams.address'))}</th><th>${escapeHtml(t('streams.connectionState'))}</th>
              <th>${escapeHtml(t('streams.duration'))}</th><th>${escapeHtml(t('streams.dropped'))}</th><th>${escapeHtml(t('streams.avSync'))}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>` : `<p class="detail-empty">${escapeHtml(t('streams.noConnections'))}</p>`}
    </details>
  `;
}

function renderStatus(status) {
  const online = status.nginx === 'online';
  const streams = status.activeStreams || [];
  const openDetails = captureOpenStreamDetails();
  document.querySelector('#connection-pill').className = `connection ${online ? 'online' : 'offline'}`;
  document.querySelector('#connection-text').textContent = t(online ? 'connection.online' : 'connection.nginxOffline');
  document.querySelector('#gateway-status').textContent = t(online ? 'metrics.online' : 'metrics.offline');
  document.querySelector('#gateway-detail').textContent = t(online ? 'metrics.nginxHealthy' : 'metrics.checkLogs');
  document.querySelector('#stream-count').textContent = streams.length;
  document.querySelector('#stream-detail').textContent = streams.length ? t('metrics.receiving', { name: streams[0].name }) : t('metrics.noStream');
  document.querySelector('#destination-count').textContent = status.enabledDestinations || 0;
  document.querySelector('#live-badge').textContent = t(streams.length ? 'ingest.live' : 'ingest.waiting');
  document.querySelector('#live-badge').className = `live-badge${streams.length ? ' live' : ''}`;
  document.querySelector('#stream-panel').hidden = !online;
  renderRuntime(status.runtime);
  document.querySelector('#stream-list').innerHTML = streams.length ? streams.map((stream, index) => `
    <article class="stream-card" data-stream-index="${index}">
      <header class="stream-card-head">
        <div><span>${escapeHtml(t('streams.name'))}</span><strong>${escapeHtml(stream.name)}</strong></div>
        <span class="stream-state${stream.active ? ' active' : ''}">${escapeHtml(t(stream.active ? 'streams.active' : 'streams.idle'))}</span>
      </header>
      <div class="stream-overview">
        <div class="stream-value"><span>${escapeHtml(t('streams.duration'))}</span><strong>${formatDuration(stream.timeMs)}</strong></div>
        <div class="stream-value"><span>${escapeHtml(t('streams.inputRate'))}</span><strong>${formatRate(stream.bandwidthIn)}</strong></div>
        <div class="stream-value"><span>${escapeHtml(t('streams.outputRate'))}</span><strong>${formatRate(stream.bandwidthOut)}</strong></div>
        <div class="stream-value"><span>${escapeHtml(t('streams.received'))}</span><strong>${formatBytes(stream.bytesIn)}</strong></div>
        <div class="stream-value"><span>${escapeHtml(t('streams.sent'))}</span><strong>${formatBytes(stream.bytesOut)}</strong></div>
        <div class="stream-value"><span>${escapeHtml(t('streams.clients'))}</span><strong>${stream.clients || 0}</strong></div>
      </div>
      ${renderMediaDetails(stream)}
      ${renderConnectionDetails(stream)}
    </article>
  `).join('') : `<div class="stream-empty">${escapeHtml(t('streams.none'))}</div>`;
  restoreOpenStreamDetails(openDetails);
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
  saveUiSettings({ locale: state.locale });
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
document.querySelector('#stream-list').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="toggle-ips"]');
  if (!button) return;
  state.revealClientIps = !state.revealClientIps;
  if (state.status) renderStatus(state.status);
});
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
