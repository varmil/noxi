import { GroupString } from 'config/constants/Site'

export type SupersRanking = {
  rank: number
  channelId: string
  channelTitle: string
  channelThumbnails: string | undefined
  streamTitle: string
  amount: string
  group: GroupString
}
