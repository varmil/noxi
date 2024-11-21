import { GroupString } from 'config/constants/Site'

export type StreamRankingPeriod =
  | 'real-time'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
export type StreamRankingDimension = 'concurrent-viewer'
export type StreamRankingGroup = GroupString
export type StreamRankingCountry = string
