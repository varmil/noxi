import { Gender } from 'types/gender'

export type MostCheeredSearchParams = {
  gender?: Gender
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}
