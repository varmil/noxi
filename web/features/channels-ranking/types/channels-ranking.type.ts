import { Gender } from 'config/constants/Gender'
import { GroupString } from 'config/constants/Site'

export type ChannelsRankingPeriod =
  | 'last24Hours'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days'
  | 'last1Year'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisYear'
export type ChannelsRankingDimension = 'super-chat' | 'subscriber'

export type ChannelsRankingSearchParams = {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group?: GroupString
  gender?: Gender
  country?: string
  /** For OG */
  date?: string
}

export type ChannelsRanking = {
  rank: number
  channelId: string
  channelTitle: string
  channelThumbnails: string | undefined
  amount: string
  group: GroupString
}
