import { GroupString } from 'config/constants/Site'

export type StreamRankingPeriod =
  | 'realtime'
  | 'last24Hours'
  | 'last7Days'
  | 'last30Days'
  | 'last1Year'
export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'
export type StreamRankingGroup = GroupString
export type StreamRankingCountry = string
