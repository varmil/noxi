import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'

/** TODO: delete period from here */
export const createSearchParams = (params: {
  period: StreamRankingPeriod
  gender?: Gender
  page?: number
}) => {
  /** periodの順番（SEO） */
  return new URLSearchParams({
    ...(params.gender && { gender: params.gender }),
    period: params.period,
    ...(params.page && params.page >= 2 && { page: params.page.toString() })
  })
}
