import { Gender } from 'types/gender'

export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'

export type StreamRankingSearchParams = {
  gender?: Gender
  country?: string
  page?: string
}
