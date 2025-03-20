import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { MembershipBundle, MembershipBundles } from '@domain/membership-bundle'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

export interface MembershipBundleRepository {
  findAll: (args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: Group
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
}
