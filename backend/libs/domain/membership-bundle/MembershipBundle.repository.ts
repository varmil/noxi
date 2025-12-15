import { GroupName } from '@domain/group'
import { Gender } from '@domain/lib'
import { Count } from '@domain/membership'
import {
  MembershipBundle,
  MembershipBundles,
  MembershipBundleSums
} from '@domain/membership-bundle'
import { ChannelId, ChannelIds, VideoId, VideoIds } from '@domain/youtube'

export interface MembershipBundleSumWhere {
  createdAt: { gte: Date; lte?: Date }
  group?: GroupName
  channelIds?: ChannelIds
  gender?: Gender
  count?: {
    gt?: Count
    gte?: Count
    lt?: Count
    lte?: Count
  }
}

export interface MembershipBundleRepository {
  findAll: (args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: GroupName
      gender?: Gender
      // NULL means "live now"
      actualEndTime?: null
      createdAt?: { gte?: Date; lte?: Date }
    }
    orderBy?: Partial<Record<'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<MembershipBundles>

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<MembershipBundle | null>

  save: (args: { data: MembershipBundle }) => Promise<void>

  /**
   * Sum count & amountMicros within a period grouped by channelId
   **/
  sum: (args: {
    where: MembershipBundleSumWhere
    orderBy?: { _sum: { amountMicros: 'asc' | 'desc' } }
    limit?: number
    offset?: number
  }) => Promise<MembershipBundleSums>
}
