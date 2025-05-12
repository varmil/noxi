import { GroupString } from 'config/constants/Group'
import { StreamRankingDimension } from 'types/dimension'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

export const createSearchParams = (params: {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: GroupString
  gender?: Gender
  page?: number
}) => {
  /** dimension, group, periodの順番（SEO） */
  return new URLSearchParams({
    dimension: params.dimension,
    ...(params.group && { group: params.group }),
    ...(params.gender && { gender: params.gender }),
    period: params.period,
    ...(params.page && params.page >= 2 && { page: params.page.toString() })
  })
}
