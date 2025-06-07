import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'

export type StreamRankingSearchParams = {
  period: StreamRankingPeriod
  gender?: Gender
  country?: string
  page?: string
}
