import { GroupString } from 'config/constants/Group'
import { Dimension } from 'types/dimension'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'

export const createSearchParams = (params: {
  period: ChannelsRankingPeriod
  dimension: Dimension
  group?: GroupString
  gender?: Gender
  page?: number
  /** for OG image */
  date?: string
}) => {
  /** dimension, group, periodの順番（SEO） */
  return new URLSearchParams({
    dimension: params.dimension,
    ...(params.group && { group: params.group }),
    ...(params.gender && { gender: params.gender }),
    period: params.period,
    ...(params.page && params.page >= 2 && { page: params.page.toString() }),
    ...(params.date && { date: params.date })
  })
}
