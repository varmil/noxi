import { Group } from '@domain/group'
import { SupersBundle, SupersBundles } from '@domain/supers-bundle'
import { ChannelId, VideoId, VideoIds } from '@domain/youtube'

export interface SupersBundleRepository {
  findAll: (args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: Group
      actualEndTime?: { gte?: Date; lte?: Date } | null
    }
    orderBy?: Partial<Record<'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<SupersBundles>

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<SupersBundle | null>

  save: (args: { data: SupersBundle }) => Promise<void>
}
