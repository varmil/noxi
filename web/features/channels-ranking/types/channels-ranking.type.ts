import { Gender } from 'types/gender'

export type ChannelsRankingDimension = 'super-chat' | 'subscriber'

export type ChannelsRankingSearchParams = {
  gender?: Gender
  country?: string
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
  /** @Important Googleから検索結果を削除するためだけに使用。完全に消えたらこのプロパティも削除 */
  channelId?: string
}

export type ChannelsRanking = {
  rank: number
  channelId: string
  channelTitle: string
  channelThumbnails: string | undefined
  amount: string
  group: string
}
