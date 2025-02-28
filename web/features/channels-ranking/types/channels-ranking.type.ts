import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'

export type ChannelsRankingDimension = 'super-chat' | 'subscriber'

export type ChannelsRankingSearchParams = {
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
  group?: GroupString
  gender?: Gender
  country?: string
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}

export type ChannelsRanking = {
  rank: number
  channelId: string
  channelTitle: string
  channelThumbnails: string | undefined
  amount: string
  group: GroupString
}
