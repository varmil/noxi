export const ReservedUsernames: Set<string> = new Set([
  // 一般的な予約語
  'admin',
  'root',
  'system',
  'null',
  'undefined',
  'login',
  'logout',
  'register',
  'signup',
  'signin',
  'settings',
  'support',
  'help',
  'contact',
  'about',
  'terms',
  'privacy',
  'api',
  'auth',

  // VCharts関連・ブランド名保護
  'peak',
  'peakx',
  'vrank',
  'vchart',
  'vcharts',
  'superchat',
  'super-chat',

  // その他よくある単語
  'notifications',
  'messages',
  'create',
  'edit',
  'delete',
  'update',

  // 将来的に使う可能性のある語（防衛的に）
  'api-docs',
  'stats',
  'analytics',
  'pricing',
  'subscribe',
  'unsubscribe',
  'billing',
  'payment'
])
