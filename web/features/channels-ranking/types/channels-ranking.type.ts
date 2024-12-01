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
export type ChannelsRankingGroup = GroupString
export type ChannelsRankingCountry = string

export type ChannelsRanking = {
  rank: number
  channelId: string
  channelTitle: string
  channelThumbnails: string | undefined
  streamTitle: string
  amount: string
  group: GroupString
}
