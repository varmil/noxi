import { Gender } from 'types/gender'

export const createSearchParams = (params: {
  gender?: Gender
  page?: number
}) => {
  return new URLSearchParams({
    ...(params.gender && { gender: params.gender }),
    ...(params.page && params.page >= 2 && { page: params.page.toString() })
  })
}
