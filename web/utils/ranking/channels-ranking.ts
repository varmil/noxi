import { GroupString } from 'config/constants/Group'
import { ChannelsRankingDimension } from 'types/dimension'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'
import { RankingType } from 'types/ranking'

export const createSearchParams = (params: {
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
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

export const hasSupersRanking = (params: {
  dimension: ChannelsRankingDimension
  group?: GroupString
  gender?: Gender
}) => {
  const { dimension, group, gender } = params
  // 現状 super-chat のみSupersRankingを持っているので
  // それ以外のdimensionはfalseを返す
  if (dimension !== 'super-chat') return false
  // group x gender 両方が指定されている場合、
  // 現状SupersRankingを持っていないのでfalseを返す
  if (group && gender) return false
  return true
}

/** group > gender > overall の優先度 */
export const getSupersRankingType = (params: {
  group?: GroupString
  gender?: Gender
}): RankingType => {
  const { group, gender } = params
  if (group) return 'group'
  if (gender) return 'gender'
  return 'overall'
}
