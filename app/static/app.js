const TRANSLATIONS = {
  en: {
    'meta.description': 'A local dashboard for managing RTMP input applications and relay destinations.',
    'brand.homeAria': 'RTMP Relay Manager home',
    'language.label': 'Language',
    'hero.eyebrow': 'PRIVATE STREAM GATEWAY',
    'hero.titlePrimary': 'Your RTMP inputs,',
    'hero.titleAccent': 'routed your way.',
    'hero.description': 'Receive video from OBS, a game-console setup, a camera, or any other RTMP source, then route each input to the platforms you choose.',
    'ingest.title': 'Local ingest routes',
    'ingest.waiting': 'Waiting for stream',
    'ingest.live': '● Live',
    'ingest.copy': 'Copy',
    'ingest.copyAria': 'Copy ingest URL',
    'ingest.description': 'Use this server URL in your streaming software. The stream name can be customized.',
    'routes.eyebrow': 'INPUT ROUTES',
    'routes.title': 'RTMP applications',
    'routes.description': 'Create one application path for each input workflow and choose where it should be relayed.',
    'routes.add': 'Add input route',
    'routes.emptyTitle': 'No input routes',
    'routes.emptyDescription': 'Add an RTMP application before publishing a stream.',
    'routes.application': 'Application',
    'routes.destinations': '{count} destinations',
    'routes.playAllowed': 'Playback allowed',
    'routes.playDenied': 'Relay only',
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
    'workspace.description': 'Add a server and stream key, or a complete RTMP push URL, then choose its input routes.',
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
    'dialog.mode': 'Address format',
    'dialog.modeSeparate': 'Server URL and stream key',
    'dialog.modeFull': 'Complete RTMP push URL',
    'dialog.fullUrl': 'Complete RTMP push URL',
    'dialog.fullUrlPlaceholder': 'rtmp://example.com/app/key',
    'dialog.fullUrlHelp': 'Use this when the platform provides one complete address containing its key or query parameters.',
    'dialog.editFullUrlHelp': 'Leave blank to keep the saved complete URL.',
    'dialog.routes': 'Input routes',
    'dialog.routesHelp': 'Only selected input routes relay to this destination.',
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
    'destination.fullUrlSaved': 'Complete push URL saved',
    'destination.routes': '{count} input routes',
    'destination.routesLabel': 'Input routes',
    'destination.unassigned': 'No input route assigned',
    'destination.moreRoutes': 'Show {count} more input routes',
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
    'toast.warning.streamReconnectRequired': 'Reconnect active publishers so the new configuration takes effect.',
    'routeDialog.eyebrow': 'INPUT ROUTE',
    'routeDialog.addTitle': 'Add input route',
    'routeDialog.editTitle': 'Edit input route',
    'routeDialog.name': 'Route name',
    'routeDialog.namePlaceholder': 'For example: PlayStation',
    'routeDialog.application': 'Application path',
    'routeDialog.applicationHelp': 'The path after the RTMP host, such as app or live.',
    'routeDialog.enabled': 'Enable route',
    'routeDialog.enabledHelp': 'Accept new publishers on this application',
    'routeDialog.allowPlay': 'Allow local playback',
    'routeDialog.allowPlayHelp': 'Required when OBS or VLC needs to pull the incoming stream',
    'routeDialog.advanced': 'Advanced RTMP settings',
    'routeDialog.reconnect': 'Push reconnect delay (seconds)',
    'routeDialog.dropIdle': 'Drop idle publisher after (seconds)',
    'routeDialog.zeroDisabled': 'Use 0 to disable.',
    'routeDialog.idleStreams': 'Allow idle streams',
    'routeDialog.waitKey': 'Wait for a video keyframe',
    'routeDialog.deleteConfirm': 'Delete input route “{name}”?',
    'settings.open': 'Server settings',
    'settings.eyebrow': 'RTMP SERVER',
    'settings.title': 'Server settings',
    'settings.chunkSize': 'Chunk size',
    'settings.ping': 'Ping interval (seconds)',
    'settings.pingTimeout': 'Ping timeout (seconds)',
    'settings.portNote': 'The internal RTMP port remains 1935 because Docker port mappings cannot be changed from this page.',
    'api.requestFailed': 'Request failed ({status})',
  },
  ja: {
    'meta.description': 'RTMP入力アプリケーションと中継先を管理するローカル管理画面です。',
    'brand.homeAria': 'RTMP Relay Manager ホーム',
    'language.label': '言語',
    'hero.eyebrow': 'プライベート配信ゲートウェイ',
    'hero.titlePrimary': 'RTMP入力を、',
    'hero.titleAccent': '自由にルーティング。',
    'hero.description': 'OBS、PlayStationやXboxなどのゲーム機環境、カメラ、その他のRTMP映像ソースから受信し、入力ごとに選択した配信先へ中継します。',
    'ingest.title': 'ローカル入力ルート',
    'ingest.waiting': '配信待機中',
    'ingest.live': '● 配信中',
    'ingest.copy': 'コピー',
    'ingest.copyAria': '配信URLをコピー',
    'ingest.description': '配信ソフトにこのサーバーURLを入力してください。ストリーム名は自由に設定できます。',
    'routes.eyebrow': '入力ルート',
    'routes.title': 'RTMP アプリケーション',
    'routes.description': '入力方式ごとにアプリケーションパスを作成し、中継先を選択します。',
    'routes.add': '入力ルートを追加',
    'routes.emptyTitle': '入力ルートがありません',
    'routes.emptyDescription': '配信する前に RTMP アプリケーションを追加してください。',
    'routes.application': 'アプリケーション',
    'routes.destinations': '配信先 {count} 件',
    'routes.playAllowed': 'ローカル再生可',
    'routes.playDenied': '中継専用',
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
    'workspace.description': 'サーバーURLとストリームキー、または完全なRTMP配信URLを追加し、入力ルートを選択します。',
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
    'dialog.mode': 'アドレス形式',
    'dialog.modeSeparate': 'サーバーURLとストリームキー',
    'dialog.modeFull': '完全なRTMPプッシュURL',
    'dialog.fullUrl': '完全なRTMPプッシュURL',
    'dialog.fullUrlPlaceholder': 'rtmp://example.com/app/key',
    'dialog.fullUrlHelp': 'キーやクエリを含む完全なURLが提供された場合に使用します。',
    'dialog.editFullUrlHelp': '空欄のままにすると保存済みURLを使用します。',
    'dialog.routes': '入力ルート',
    'dialog.routesHelp': '選択した入力ルートだけがこの配信先へ中継します。',
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
    'destination.fullUrlSaved': '完全な配信URLを保存済み',
    'destination.routes': '入力ルート {count} 件',
    'destination.routesLabel': '入力ルート',
    'destination.unassigned': '入力ルートが未設定です',
    'destination.moreRoutes': '残り {count} 件の入力ルートを表示',
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
    'toast.warning.streamReconnectRequired': '新しい設定を反映するため、配信元を再接続してください。',
    'routeDialog.eyebrow': '入力ルート',
    'routeDialog.addTitle': '入力ルートを追加',
    'routeDialog.editTitle': '入力ルートを編集',
    'routeDialog.name': 'ルート名',
    'routeDialog.namePlaceholder': '例：PlayStation',
    'routeDialog.application': 'アプリケーションパス',
    'routeDialog.applicationHelp': 'RTMPホストの後ろに付く app や live などのパスです。',
    'routeDialog.enabled': 'ルートを有効化',
    'routeDialog.enabledHelp': 'このアプリケーションへの新規配信を受け付けます',
    'routeDialog.allowPlay': 'ローカル再生を許可',
    'routeDialog.allowPlayHelp': 'OBSやVLCで入力配信を取得する場合に必要です',
    'routeDialog.advanced': 'RTMP 詳細設定',
    'routeDialog.reconnect': 'プッシュ再接続待機（秒）',
    'routeDialog.dropIdle': 'アイドル配信を切断（秒）',
    'routeDialog.zeroDisabled': '0 で無効になります。',
    'routeDialog.idleStreams': 'アイドルストリームを許可',
    'routeDialog.waitKey': '映像キーフレームを待機',
    'routeDialog.deleteConfirm': '入力ルート「{name}」を削除しますか？',
    'settings.open': 'サーバー設定',
    'settings.eyebrow': 'RTMP サーバー',
    'settings.title': 'サーバー設定',
    'settings.chunkSize': 'チャンクサイズ',
    'settings.ping': 'Ping間隔（秒）',
    'settings.pingTimeout': 'Pingタイムアウト（秒）',
    'settings.portNote': 'Dockerのポート割り当てはこの画面から変更できないため、内部RTMPポートは1935のままです。',
    'api.requestFailed': 'リクエストに失敗しました（{status}）',
  },
  'zh-CN': {
    'meta.description': '用于管理 RTMP 输入 Application 和转推目的地的局域网面板',
    'brand.homeAria': 'RTMP Relay Manager 首页',
    'language.label': '语言',
    'hero.eyebrow': '私有直播网关',
    'hero.titlePrimary': '多组 RTMP 输入，',
    'hero.titleAccent': '按需转推。',
    'hero.description': '从 OBS、PlayStation 或 Xbox 等游戏主机方案、摄像机及其他 RTMP 视频源接收直播，再将每组输入转推到指定的平台。',
    'ingest.title': '本机输入路由',
    'ingest.waiting': '等待直播流',
    'ingest.live': '● 正在直播',
    'ingest.copy': '复制',
    'ingest.copyAria': '复制推流地址',
    'ingest.description': '在推流软件中填写此服务器地址，串流名称可以自定义。',
    'routes.eyebrow': '输入路由',
    'routes.title': 'RTMP Applications',
    'routes.description': '为不同输入方式创建独立的 Application 路径，并选择对应的转推目的地。',
    'routes.add': '添加输入路由',
    'routes.emptyTitle': '还没有输入路由',
    'routes.emptyDescription': '推流前请先添加一个 RTMP Application。',
    'routes.application': 'Application',
    'routes.destinations': '{count} 个目的地',
    'routes.playAllowed': '允许本地拉流',
    'routes.playDenied': '仅用于转推',
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
    'workspace.description': '添加服务器地址和串流密钥，或完整 RTMP 推流地址，然后选择对应的输入路由。',
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
    'dialog.mode': '地址格式',
    'dialog.modeSeparate': '服务器地址和串流密钥',
    'dialog.modeFull': '完整 RTMP 推流地址',
    'dialog.fullUrl': '完整 RTMP 推流地址',
    'dialog.fullUrlPlaceholder': 'rtmp://example.com/app/key',
    'dialog.fullUrlHelp': '平台只提供一个包含密钥或查询参数的完整地址时使用。',
    'dialog.editFullUrlHelp': '留空会继续使用已保存的完整地址。',
    'dialog.routes': '输入路由',
    'dialog.routesHelp': '只有选中的输入路由才会转推到这个目的地。',
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
    'destination.fullUrlSaved': '已保存完整推流地址',
    'destination.routes': '{count} 个输入路由',
    'destination.routesLabel': '输入路由',
    'destination.unassigned': '未绑定输入路由',
    'destination.moreRoutes': '显示其余 {count} 个输入路由',
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
    'toast.warning.streamReconnectRequired': '请重新连接正在推流的设备，让新配置完整生效。',
    'routeDialog.eyebrow': '输入路由',
    'routeDialog.addTitle': '添加输入路由',
    'routeDialog.editTitle': '编辑输入路由',
    'routeDialog.name': '路由名称',
    'routeDialog.namePlaceholder': '例如：PlayStation',
    'routeDialog.application': 'Application 路径',
    'routeDialog.applicationHelp': 'RTMP 主机地址后面的路径，例如 app 或 live。',
    'routeDialog.enabled': '启用路由',
    'routeDialog.enabledHelp': '允许新的推流端连接到这个 Application',
    'routeDialog.allowPlay': '允许本地拉流',
    'routeDialog.allowPlayHelp': '需要使用 OBS 或 VLC 拉取输入流时必须开启',
    'routeDialog.advanced': 'RTMP 高级设置',
    'routeDialog.reconnect': '转推重连间隔（秒）',
    'routeDialog.dropIdle': '空闲推流端断开时间（秒）',
    'routeDialog.zeroDisabled': '填写 0 表示关闭。',
    'routeDialog.idleStreams': '允许空闲直播流',
    'routeDialog.waitKey': '等待视频关键帧',
    'routeDialog.deleteConfirm': '确定删除输入路由“{name}”吗？',
    'settings.open': '服务器设置',
    'settings.eyebrow': 'RTMP 服务器',
    'settings.title': '服务器设置',
    'settings.chunkSize': 'Chunk 大小',
    'settings.ping': 'Ping 间隔（秒）',
    'settings.pingTimeout': 'Ping 超时（秒）',
    'settings.portNote': 'Docker 端口映射无法从页面修改，因此容器内部 RTMP 端口固定为 1935。',
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
  config: { version: 2, revision: 1, settings: {}, routes: [], destinations: [] },
  status: null,
  editingDestinationId: null,
  editingRouteId: null,
  snapshots: {},
  locale: uiSettings.locale,
  saving: false,
  revealClientIps: false,
};

const elements = {
  destinationDialog: document.querySelector('#destination-dialog'),
  destinationForm: document.querySelector('#destination-form'),
  destinationList: document.querySelector('#destination-list'),
  destinationEmpty: document.querySelector('#empty-state'),
  routeDialog: document.querySelector('#route-dialog'),
  routeForm: document.querySelector('#route-form'),
  routeList: document.querySelector('#route-list'),
  routeEmpty: document.querySelector('#route-empty'),
  settingsDialog: document.querySelector('#settings-dialog'),
  settingsForm: document.querySelector('#settings-form'),
  toast: document.querySelector('#toast'),
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

function newId() {
  if (globalThis.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
  }
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function showToast(message, error = false) {
  elements.toast.textContent = message;
  elements.toast.className = `toast show${error ? ' error' : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { elements.toast.className = 'toast'; }, 4200);
}

function clearDialogError(dialog) {
  const error = dialog.querySelector('.dialog-error');
  error.textContent = '';
  error.hidden = true;
}

function showDialogError(dialog, message) {
  const error = dialog.querySelector('.dialog-error');
  error.textContent = message;
  error.hidden = false;
  error.focus({ preventScroll: true });
  error.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

async function api(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeout || 10000);
  try {
    const response = await fetch(path, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || t('api.requestFailed', { status: response.status }));
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

function renderDestinations() {
  const destinations = state.config.destinations;
  elements.destinationEmpty.hidden = destinations.length > 0;
  elements.destinationList.innerHTML = destinations.map((item) => {
    const assignedRoutes = state.config.routes.filter((route) => route.destinationIds.includes(item.id));
    const routeChips = assignedRoutes.length ? assignedRoutes.map((route, index) => `
      <span class="route-chip${index >= 3 ? ' route-chip-overflow' : ''}"${index >= 3 ? ' hidden' : ''} title="${escapeHtml(`${route.name} /${route.application}`)}">
        <span>${escapeHtml(route.name)}</span><code>/${escapeHtml(route.application)}</code>
      </span>
    `).join('') : `<span class="route-chip unassigned">${escapeHtml(t('destination.unassigned'))}</span>`;
    const remainingRoutes = Math.max(assignedRoutes.length - 3, 0);
    const address = item.mode === 'fullUrl' ? item.pushUrlHint : item.serverUrl;
    const secretHint = item.mode === 'fullUrl'
      ? t('destination.fullUrlSaved')
      : t('destination.savedKey', { hint: item.streamKeyHint || t('destination.saved') });
    return `
    <article class="destination-card${item.enabled ? '' : ' disabled'}" data-id="${escapeHtml(item.id)}">
      <div class="destination-name">
        <span class="platform-icon">${escapeHtml(item.name.slice(0, 1).toUpperCase())}</span>
        <div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(secretHint)}</small></div>
      </div>
      <div class="destination-url">
        <strong>${escapeHtml(address || '—')}</strong>
        <div class="destination-routing">
          <small>${escapeHtml(t('destination.routesLabel'))}</small>
          <div class="route-chips">${routeChips}${remainingRoutes ? `<button class="route-chip route-chip-more" type="button" data-action="expand-routes" aria-label="${escapeHtml(t('destination.moreRoutes', { count: remainingRoutes }))}">+${remainingRoutes}</button>` : ''}</div>
        </div>
      </div>
      <span class="state-label${item.enabled ? ' enabled' : ''}">${escapeHtml(t(item.enabled ? 'destination.enabled' : 'destination.disabled'))}</span>
      <div class="card-actions">
        <button type="button" data-action="toggle">${escapeHtml(t(item.enabled ? 'destination.disable' : 'destination.enable'))}</button>
        <button type="button" data-action="edit">${escapeHtml(t('destination.edit'))}</button>
        <button class="delete" type="button" data-action="delete">${escapeHtml(t('destination.delete'))}</button>
      </div>
    </article>
  `; }).join('');
}

function ingestUrl(application) {
  const host = window.location.hostname || 'localhost';
  return `rtmp://${host}:1935/${application}`;
}

function renderIngestRoutes() {
  const routes = state.config.routes.filter((route) => route.enabled);
  document.querySelector('#ingest-routes').innerHTML = routes.length ? routes.map((route) => `
    <div class="url-box ingest-route-url">
      <span class="ingest-route-name">${escapeHtml(route.name)}</span>
      <code>${escapeHtml(ingestUrl(route.application))}</code>
      <button class="icon-button" type="button" data-copy-url="${escapeHtml(ingestUrl(route.application))}">${escapeHtml(t('ingest.copy'))}</button>
    </div>
  `).join('') : '<span class="state-label">—</span>';
}

function renderRoutes() {
  const routes = state.config.routes;
  elements.routeEmpty.hidden = routes.length > 0;
  elements.routeList.innerHTML = routes.map((route) => `
    <article class="route-card${route.enabled ? '' : ' disabled'}" data-id="${escapeHtml(route.id)}">
      <div class="route-main"><span class="platform-icon">⇥</span><div><strong>${escapeHtml(route.name)}</strong><small>${escapeHtml(t('routes.application'))}: /${escapeHtml(route.application)}</small></div></div>
      <code>${escapeHtml(ingestUrl(route.application))}</code>
      <div class="route-meta"><span>${escapeHtml(t('routes.destinations', { count: route.destinationIds.length }))}</span><span>${escapeHtml(t(route.allowPlay ? 'routes.playAllowed' : 'routes.playDenied'))}</span></div>
      <div class="card-actions"><button type="button" data-action="toggle">${escapeHtml(t(route.enabled ? 'destination.disable' : 'destination.enable'))}</button><button type="button" data-action="edit">${escapeHtml(t('destination.edit'))}</button><button class="delete" type="button" data-action="delete">${escapeHtml(t('destination.delete'))}</button></div>
    </article>
  `).join('');
  renderIngestRoutes();
}

function renderAllConfig() {
  renderRoutes();
  renderDestinations();
}

function destinationSnapshot() {
  return JSON.stringify({
    name: document.querySelector('#destination-name').value,
    mode: document.querySelector('#destination-mode').value,
    serverUrl: document.querySelector('#server-url').value,
    streamKey: document.querySelector('#stream-key').value,
    pushUrl: document.querySelector('#push-url').value,
    enabled: document.querySelector('#destination-enabled').checked,
    routeIds: [...document.querySelectorAll('#destination-route-options input:checked')].map((input) => input.value).sort(),
  });
}

function updateDialogCopy() {
  document.querySelector('#dialog-title').textContent = t(state.editingDestinationId ? 'dialog.editTitle' : 'dialog.addTitle');
  document.querySelector('#key-help').textContent = t(state.editingDestinationId ? 'dialog.editKeyHelp' : 'dialog.newKeyHelp');
  document.querySelector('#push-url-help').textContent = t(state.editingDestinationId ? 'dialog.editFullUrlHelp' : 'dialog.fullUrlHelp');
  const keyInput = document.querySelector('#stream-key');
  document.querySelector('#toggle-key').textContent = t(keyInput.type === 'password' ? 'dialog.show' : 'dialog.hide');
  const pushInput = document.querySelector('#push-url');
  document.querySelector('#toggle-push-url').textContent = t(pushInput.type === 'password' ? 'dialog.show' : 'dialog.hide');
  if (!state.saving) document.querySelector('#save-destination').textContent = t('dialog.save');
}

function renderDestinationRouteOptions(destinationId = null) {
  const container = document.querySelector('#destination-route-options');
  container.innerHTML = state.config.routes.length ? state.config.routes.map((route) => `
    <label><input type="checkbox" value="${escapeHtml(route.id)}" ${destinationId && route.destinationIds.includes(destinationId) ? 'checked' : ''}><span>${escapeHtml(route.name)} <small>/${escapeHtml(route.application)}</small></span></label>
  `).join('') : `<span class="state-label">${escapeHtml(t('routes.emptyTitle'))}</span>`;
}

function updateDestinationMode() {
  const selectedMode = document.querySelector('#destination-mode').value;
  const full = selectedMode === 'fullUrl';
  const existing = state.config.destinations.find((item) => item.id === state.editingDestinationId);
  const needsNewSecret = !existing || existing.mode !== selectedMode;
  document.querySelector('#server-url-field').hidden = full;
  document.querySelector('#stream-key-field').hidden = full;
  document.querySelector('#push-url-field').hidden = !full;
  document.querySelector('#server-url').required = !full;
  document.querySelector('#stream-key').required = !full && needsNewSecret;
  document.querySelector('#push-url').required = full && needsNewSecret;
}

function openDestinationDialog(item = null) {
  clearDialogError(elements.destinationDialog);
  state.editingDestinationId = item?.id || null;
  document.querySelector('#destination-id').value = item?.id || '';
  document.querySelector('#destination-name').value = item?.name || '';
  document.querySelector('#destination-mode').value = item?.mode || 'serverKey';
  document.querySelector('#server-url').value = item?.serverUrl || '';
  document.querySelector('#stream-key').value = '';
  document.querySelector('#stream-key').type = 'password';
  document.querySelector('#push-url').value = '';
  document.querySelector('#push-url').type = 'password';
  document.querySelector('#destination-enabled').checked = item?.enabled ?? true;
  renderDestinationRouteOptions(item?.id || null);
  updateDestinationMode();
  updateDialogCopy();
  state.snapshots.destination = destinationSnapshot();
  elements.destinationDialog.showModal();
  document.querySelector('#destination-name').focus();
}

function requestDialogClose(dialog, snapshotName, snapshotFunction) {
  if (state.saving) return;
  const hasChanges = state.snapshots[snapshotName] !== undefined && snapshotFunction() !== state.snapshots[snapshotName];
  if (hasChanges && !window.confirm(t('dialog.discardConfirm'))) return;
  dialog.close('cancel');
}

function serializableDestinations() {
  return state.config.destinations.map((item) => ({
    id: item.id,
    name: item.name,
    mode: item.mode,
    ...(item.mode === 'fullUrl' ? { pushUrl: item.pushUrl || '' } : { serverUrl: item.serverUrl, streamKey: item.streamKey || '' }),
    enabled: item.enabled,
  }));
}

function serializableConfig(overrides = {}) {
  return {
    version: state.config.version,
    revision: state.config.revision,
    settings: overrides.settings || state.config.settings,
    routes: overrides.routes || state.config.routes,
    destinations: overrides.destinations || serializableDestinations(),
  };
}

async function saveConfig(overrides, successMessage) {
  const payload = await api('/api/config', {
    method: 'PUT',
    body: JSON.stringify(serializableConfig(overrides)),
  });
  state.config = payload.config;
  renderAllConfig();
  const warning = payload.warningCode ? t(`toast.warning.${payload.warningCode}`) : '';
  showToast(warning ? `${successMessage} ${warning}` : successMessage);
  await refreshStatus();
}

async function handleFormSubmit(event) {
  event.preventDefault();
  if (!elements.destinationForm.reportValidity()) return;
  const destination = {
    id: document.querySelector('#destination-id').value,
    name: document.querySelector('#destination-name').value.trim(),
    mode: document.querySelector('#destination-mode').value,
    serverUrl: document.querySelector('#server-url').value.trim(),
    streamKey: document.querySelector('#stream-key').value,
    pushUrl: document.querySelector('#push-url').value,
    enabled: document.querySelector('#destination-enabled').checked,
  };
  const destinations = serializableDestinations();
  const index = destinations.findIndex((item) => item.id === destination.id);
  if (index >= 0) destinations[index] = destination;
  else destinations.push(destination);
  const selectedRouteIds = new Set([...document.querySelectorAll('#destination-route-options input:checked')].map((input) => input.value));
  const destinationId = destination.id || '__new__';
  const routes = state.config.routes.map((route) => {
    const ids = route.destinationIds.filter((id) => id !== destination.id);
    if (selectedRouteIds.has(route.id)) ids.push(destinationId);
    return { ...route, destinationIds: ids };
  });

  state.saving = true;
  const controls = ['#save-destination', '#cancel-destination', '#close-dialog'].map((selector) => document.querySelector(selector));
  controls.forEach((control) => { control.disabled = true; });
  controls[0].textContent = t('dialog.saving');
  try {
    if (!destination.id) {
      destination.id = newId();
      routes.forEach((route) => { route.destinationIds = route.destinationIds.map((id) => id === '__new__' ? destination.id : id); });
      destinations[destinations.length - 1] = destination;
    }
    await saveConfig({ destinations, routes }, t('toast.configSaved'));
    elements.destinationDialog.close('saved');
  } catch (error) {
    showDialogError(elements.destinationDialog, error.message);
  } finally {
    state.saving = false;
    controls.forEach((control) => { control.disabled = false; });
    controls[0].textContent = t('dialog.save');
  }
}

async function handleCardAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const card = button.closest('[data-id]');
  if (button.dataset.action === 'expand-routes') {
    card.querySelectorAll('.route-chip-overflow').forEach((chip) => { chip.hidden = false; });
    button.remove();
    return;
  }
  const item = state.config.destinations.find((destination) => destination.id === card.dataset.id);
  if (!item) return;
  if (button.dataset.action === 'edit') {
    openDestinationDialog(item);
    return;
  }
  if (button.dataset.action === 'delete' && !window.confirm(t('destination.deleteConfirm', { name: item.name }))) return;

  const destinations = serializableDestinations();
  let routes = state.config.routes;
  if (button.dataset.action === 'delete') {
    destinations.splice(destinations.findIndex((destination) => destination.id === item.id), 1);
    routes = routes.map((route) => ({ ...route, destinationIds: route.destinationIds.filter((id) => id !== item.id) }));
  } else {
    destinations.find((destination) => destination.id === item.id).enabled = !item.enabled;
  }
  try {
    await saveConfig({ destinations, routes }, t(button.dataset.action === 'delete' ? 'toast.deleted' : 'toast.stateUpdated'));
  } catch (error) {
    showToast(error.message, true);
  }
}

function routeSnapshot() {
  return JSON.stringify({
    name: document.querySelector('#route-name').value,
    application: document.querySelector('#route-application').value,
    enabled: document.querySelector('#route-enabled').checked,
    allowPlay: document.querySelector('#route-allow-play').checked,
    idleStreams: document.querySelector('#route-idle-streams').checked,
    waitKey: document.querySelector('#route-wait-key').checked,
    dropIdlePublisherSeconds: document.querySelector('#route-drop-idle').value,
    pushReconnectSeconds: document.querySelector('#route-reconnect').value,
  });
}

function openRouteDialog(item = null) {
  clearDialogError(elements.routeDialog);
  state.editingRouteId = item?.id || null;
  document.querySelector('#route-dialog-title').textContent = t(item ? 'routeDialog.editTitle' : 'routeDialog.addTitle');
  document.querySelector('#route-id').value = item?.id || '';
  document.querySelector('#route-name').value = item?.name || '';
  document.querySelector('#route-application').value = item?.application || '';
  document.querySelector('#route-enabled').checked = item?.enabled ?? true;
  document.querySelector('#route-allow-play').checked = item?.allowPlay ?? true;
  document.querySelector('#route-idle-streams').checked = item?.idleStreams ?? false;
  document.querySelector('#route-wait-key').checked = item?.waitKey ?? false;
  document.querySelector('#route-drop-idle').value = item?.dropIdlePublisherSeconds ?? 0;
  document.querySelector('#route-reconnect').value = item?.pushReconnectSeconds ?? 1;
  state.snapshots.route = routeSnapshot();
  elements.routeDialog.showModal();
  document.querySelector('#route-name').focus();
}

async function handleRouteSubmit(event) {
  event.preventDefault();
  if (!elements.routeForm.reportValidity()) return;
  const route = {
    id: document.querySelector('#route-id').value || newId(),
    name: document.querySelector('#route-name').value.trim(),
    application: document.querySelector('#route-application').value.trim(),
    enabled: document.querySelector('#route-enabled').checked,
    allowPlay: document.querySelector('#route-allow-play').checked,
    idleStreams: document.querySelector('#route-idle-streams').checked,
    waitKey: document.querySelector('#route-wait-key').checked,
    dropIdlePublisherSeconds: Number(document.querySelector('#route-drop-idle').value),
    pushReconnectSeconds: Number(document.querySelector('#route-reconnect').value),
    destinationIds: state.config.routes.find((item) => item.id === state.editingRouteId)?.destinationIds || [],
  };
  const routes = state.config.routes.map((item) => ({ ...item }));
  const index = routes.findIndex((item) => item.id === route.id);
  if (index >= 0) routes[index] = route; else routes.push(route);
  try {
    await saveConfig({ routes }, t('toast.configSaved'));
    elements.routeDialog.close('saved');
  } catch (error) { showDialogError(elements.routeDialog, error.message); }
}

async function handleRouteAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const item = state.config.routes.find((route) => route.id === button.closest('[data-id]').dataset.id);
  if (!item) return;
  if (button.dataset.action === 'edit') return openRouteDialog(item);
  if (button.dataset.action === 'delete' && !window.confirm(t('routeDialog.deleteConfirm', { name: item.name }))) return;
  let routes = state.config.routes.map((route) => ({ ...route }));
  if (button.dataset.action === 'delete') routes = routes.filter((route) => route.id !== item.id);
  else routes.find((route) => route.id === item.id).enabled = !item.enabled;
  try { await saveConfig({ routes }, t('toast.stateUpdated')); } catch (error) { showToast(error.message, true); }
}

function settingsSnapshot() {
  return JSON.stringify({ chunkSize: document.querySelector('#setting-chunk-size').value, pingSeconds: document.querySelector('#setting-ping').value, pingTimeoutSeconds: document.querySelector('#setting-ping-timeout').value });
}

function openSettingsDialog() {
  clearDialogError(elements.settingsDialog);
  document.querySelector('#setting-chunk-size').value = state.config.settings.chunkSize;
  document.querySelector('#setting-ping').value = state.config.settings.pingSeconds;
  document.querySelector('#setting-ping-timeout').value = state.config.settings.pingTimeoutSeconds;
  state.snapshots.settings = settingsSnapshot();
  elements.settingsDialog.showModal();
}

async function handleSettingsSubmit(event) {
  event.preventDefault();
  if (!elements.settingsForm.reportValidity()) return;
  const settings = { chunkSize: Number(document.querySelector('#setting-chunk-size').value), pingSeconds: Number(document.querySelector('#setting-ping').value), pingTimeoutSeconds: Number(document.querySelector('#setting-ping-timeout').value) };
  try { await saveConfig({ settings }, t('toast.configSaved')); elements.settingsDialog.close('saved'); } catch (error) { showDialogError(elements.settingsDialog, error.message); }
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
  document.querySelector('#stream-detail').textContent = streams.length ? t('metrics.receiving', { name: `${streams[0].application}/${streams[0].name}` }) : t('metrics.noStream');
  document.querySelector('#destination-count').textContent = status.enabledDestinations || 0;
  document.querySelector('#live-badge').textContent = t(streams.length ? 'ingest.live' : 'ingest.waiting');
  document.querySelector('#live-badge').className = `live-badge${streams.length ? ' live' : ''}`;
  document.querySelector('#stream-panel').hidden = !online;
  renderRuntime(status.runtime);
  document.querySelector('#stream-list').innerHTML = streams.length ? streams.map((stream, index) => `
    <article class="stream-card" data-stream-index="${index}">
      <header class="stream-card-head">
        <div><span>${escapeHtml(t('streams.name'))}</span><strong>/${escapeHtml(stream.application)}/${escapeHtml(stream.name)}</strong></div>
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
  renderAllConfig();
  updateDialogCopy();
  document.querySelector('#route-dialog-title').textContent = t(state.editingRouteId ? 'routeDialog.editTitle' : 'routeDialog.addTitle');
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
  try {
    const config = await api('/api/config');
    state.config = config;
    renderAllConfig();
  } catch (error) {
    showToast(error.message, true);
  }
  await refreshStatus();
  const scheduleRefresh = async () => {
    await refreshStatus();
    setTimeout(scheduleRefresh, 5000);
  };
  setTimeout(scheduleRefresh, 5000);
}

document.querySelector('#add-destination').addEventListener('click', () => openDestinationDialog());
document.querySelector('#empty-add').addEventListener('click', () => openDestinationDialog());
document.querySelector('#add-route').addEventListener('click', () => openRouteDialog());
document.querySelector('#open-settings').addEventListener('click', openSettingsDialog);
elements.destinationForm.addEventListener('submit', handleFormSubmit);
elements.routeForm.addEventListener('submit', handleRouteSubmit);
elements.settingsForm.addEventListener('submit', handleSettingsSubmit);
[elements.destinationForm, elements.routeForm, elements.settingsForm].forEach((form) => {
  form.addEventListener('input', () => clearDialogError(form.closest('dialog')));
  form.addEventListener('change', () => clearDialogError(form.closest('dialog')));
});
elements.destinationList.addEventListener('click', handleCardAction);
elements.routeList.addEventListener('click', handleRouteAction);
document.querySelector('#stream-list').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="toggle-ips"]');
  if (!button) return;
  state.revealClientIps = !state.revealClientIps;
  if (state.status) renderStatus(state.status);
});
document.querySelector('#cancel-destination').addEventListener('click', () => requestDialogClose(elements.destinationDialog, 'destination', destinationSnapshot));
document.querySelector('#close-dialog').addEventListener('click', () => requestDialogClose(elements.destinationDialog, 'destination', destinationSnapshot));
elements.destinationDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  requestDialogClose(elements.destinationDialog, 'destination', destinationSnapshot);
});
elements.destinationDialog.addEventListener('close', () => {
  state.editingDestinationId = null;
  delete state.snapshots.destination;
});
document.querySelector('#cancel-route').addEventListener('click', () => requestDialogClose(elements.routeDialog, 'route', routeSnapshot));
document.querySelector('#close-route-dialog').addEventListener('click', () => requestDialogClose(elements.routeDialog, 'route', routeSnapshot));
elements.routeDialog.addEventListener('cancel', (event) => { event.preventDefault(); requestDialogClose(elements.routeDialog, 'route', routeSnapshot); });
elements.routeDialog.addEventListener('close', () => { state.editingRouteId = null; delete state.snapshots.route; });
document.querySelector('#cancel-settings').addEventListener('click', () => requestDialogClose(elements.settingsDialog, 'settings', settingsSnapshot));
document.querySelector('#close-settings').addEventListener('click', () => requestDialogClose(elements.settingsDialog, 'settings', settingsSnapshot));
elements.settingsDialog.addEventListener('cancel', (event) => { event.preventDefault(); requestDialogClose(elements.settingsDialog, 'settings', settingsSnapshot); });
elements.settingsDialog.addEventListener('close', () => { delete state.snapshots.settings; });
elements.language.addEventListener('change', (event) => applyLanguage(event.currentTarget.value));
document.querySelector('#destination-mode').addEventListener('change', updateDestinationMode);
document.querySelector('#toggle-key').addEventListener('click', (event) => {
  const input = document.querySelector('#stream-key');
  input.type = input.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = t(input.type === 'password' ? 'dialog.show' : 'dialog.hide');
});
document.querySelector('#toggle-push-url').addEventListener('click', (event) => {
  const input = document.querySelector('#push-url');
  input.type = input.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = t(input.type === 'password' ? 'dialog.show' : 'dialog.hide');
});
document.querySelector('#ingest-routes').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-url]');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copyUrl);
    showToast(t('toast.copied'));
  } catch (_) {
    showToast(t('toast.copyFailed'), true);
  }
});

initialize();
