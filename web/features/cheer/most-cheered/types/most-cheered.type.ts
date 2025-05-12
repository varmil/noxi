import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

export type MostCheeredSearchParams = {
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}
