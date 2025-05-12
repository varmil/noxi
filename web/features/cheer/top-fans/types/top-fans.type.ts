import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { TopFansPeriod } from 'types/period'

export type TopFansSearchParams = {
  period: TopFansPeriod
  group?: GroupString
  gender?: Gender
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}
