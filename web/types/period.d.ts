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
  | 'all'

/**
 * 応援される側のランキング
 */
export type MostCheeredPeriod = 'last7Days' | 'last30Days' | 'all'

/**
 * ファンランキング
 */
export type TopFansPeriod = 'last7Days' | 'last30Days' | 'all'

/**
 * スパチャランキング or チャンネル登録者数ランキング
 */
export type ChannelsRankingPeriod = Period

/**
 * 同接数ランキング
 *
 * 「realtime」が追加される
 * またUI上では今年、今週などは表示されないがロジック的には動くので
 * ここの型定義には含めている
 **/
export type StreamRankingPeriod = 'realtime' | Period
