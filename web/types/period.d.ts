/**
 * ランキング、カードなどサービス全体で基本となるPeriod
 */
export type Period =
  | 'last24Hours'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days'
  | 'last1Year'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisYear'
  | 'wholePeriod'

/**
 * 応援される側のランキング
 */
export type MostCheeredPeriod = 'last7Days' | 'last30Days' | 'wholePeriod'

/**
 * ファンランキング
 */
export type TopFansPeriod = 'last7Days' | 'last30Days' | 'wholePeriod'

/**
 * 週間スナップショット（例: weekly-2026-W01）
 * URLパスセグメントとして使うため、スラッシュではなくハイフンを使用
 */
export type WeeklySnapshotPeriod = `weekly-${string}`

/**
 * 月間スナップショット（例: monthly-2025-07）
 * URLパスセグメントとして使うため、スラッシュではなくハイフンを使用
 */
export type MonthlySnapshotPeriod = `monthly-${string}`

/**
 * スナップショット期間（週間・月間）
 */
export type SnapshotPeriod = WeeklySnapshotPeriod | MonthlySnapshotPeriod

/**
 * スパチャランキング or チャンネル登録者数ランキング
 * 通常のPeriodに加え、スナップショット期間もサポート
 */
export type ChannelsRankingPeriod = Period | SnapshotPeriod

/**
 * 同接数ランキング / ライブ集計ランキング
 *
 * 「realtime」が追加される
 * またUI上では今年、今週などは表示されないがロジック的には動くので
 * ここの型定義には含めている
 *
 * スナップショット期間（週間・月間）もサポート
 * チャンネル集計ページからの SwitchTabs 遷移でフォールバックせず表示するため
 **/
export type StreamRankingPeriod = 'realtime' | Period | SnapshotPeriod
