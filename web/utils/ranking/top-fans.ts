import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

export const createSearchParams = (params: {
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  page?: number
  /** for OG image */
  date?: string
}) => {
  /** group, periodの順番（SEO） */
  return new URLSearchParams({
    ...(params.group && { group: params.group }),
    ...(params.gender && { gender: params.gender }),
    period: params.period,
    ...(params.page && params.page >= 2 && { page: params.page.toString() }),
    ...(params.date && { date: params.date })
  })
}

/** TODO: 順位変動を表示する場合TRUE */
export const hasRank = (params: { group?: GroupString; gender?: Gender }) => {
  return false
}
