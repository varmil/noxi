import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'

export type StreamRankingSearchParams = {
  dimension: StreamRankingDimension
  period: StreamRankingPeriod
  group?: GroupString
  gender?: Gender
  country?: string
  page?: string
}
