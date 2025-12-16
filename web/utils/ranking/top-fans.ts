import { Gender } from 'types/gender'

/** @deprecated */
export const createSearchParams = (params: {
  gender?: Gender
  page?: number
  /** for OG image */
  date?: string
}) => {
  return new URLSearchParams({
    ...(params.gender && { gender: params.gender }),
    ...(params.page && params.page >= 2 && { page: params.page.toString() }),
    ...(params.date && { date: params.date })
  })
}

/** TODO: 順位変動を表示する場合TRUE */
export const hasRank = () => {
  return false
}
