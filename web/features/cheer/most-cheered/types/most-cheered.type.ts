import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

// export type MostCheeredDimension = 'super-chat' | 'subscriber'

export type MostCheeredSearchParams = {
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  /** For OG */
  date?: string
  /** For Pagination */
  page?: string
}

// export type MostCheered = {
//   rank: number
//   channelId: string
//   channelTitle: string
//   channelThumbnails: string | undefined
//   amount: string
//   group: GroupString
// }
