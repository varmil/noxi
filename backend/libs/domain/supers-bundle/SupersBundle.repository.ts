import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { AmountMicros } from '@domain/supers'
import {
  SupersBundle,
  SupersBundles,
  SupersBundleSums
} from '@domain/supers-bundle'
import { ChannelId, ChannelIds, VideoId, VideoIds } from '@domain/youtube'

export interface AmountMicrosSum {
  channelId: ChannelId
  amountMicros: AmountMicros
}

export interface SupersBundleRepository {
  findAll: (args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: Group
      gender?: Gender
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

  /**
   * Sum amountMicros within a period grouped by channelId
   * OR: last24Hours && Realtime（ライブ中）の金額計算をする場合に指定する
   **/
  sum: (args: {
    where: {
      channelIds?: ChannelIds
      group?: Group
      gender?: Gender
      actualEndTime?: { gte: Date; lte?: Date }
      OR?: [{ actualEndTime: { gte: Date } }, { createdAt: { gte: Date } }]
    }
    orderBy?: { _sum: { amountMicros: 'asc' | 'desc' } }
    limit?: number
    offset?: number
  }) => Promise<SupersBundleSums>
}
