import { GroupString } from 'config/constants/Site'

export type StreamRankingPeriod =
  | 'realtime'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'
export type StreamRankingGroup = GroupString
export type StreamRankingCountry = string
