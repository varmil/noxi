import { Gender } from 'types/gender'

export type TopFansSearchParams = {
  gender?: Gender
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}
