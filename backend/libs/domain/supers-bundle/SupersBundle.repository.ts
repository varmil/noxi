import { Group } from '@domain/group'
import { AmountMicros } from '@domain/supers'
import { SupersBundle, SupersBundles } from '@domain/supers-bundle'
import { ChannelId, ChannelIds, VideoId, VideoIds } from '@domain/youtube'

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

  /** Sum amountMicros within a period grouped by channelId */
  sum: (args: {
    where: {
      channelIds: ChannelIds
      actualEndTime: { gte: Date }
    }
  }) => Promise<
    {
      channelId: ChannelId
      amountMicros: AmountMicros
    }[]
  >
}
