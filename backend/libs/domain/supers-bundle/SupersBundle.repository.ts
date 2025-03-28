import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { AmountMicros } from '@domain/lib/currency'
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

export interface SupersBundleSumWhere {
  createdAt: { gte: Date; lte?: Date }
  group?: Group
  channelIds?: ChannelIds
  gender?: Gender
  amountMicros?: {
    gt?: AmountMicros
    gte?: AmountMicros
    lt?: AmountMicros
    lte?: AmountMicros
  }
}

export interface SupersBundleRepository {
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
  }) => Promise<SupersBundles>

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<SupersBundle | null>

  save: (args: { data: SupersBundle }) => Promise<void>

  /**
   * Sum amountMicros within a period grouped by channelId
   **/
  sum: (args: {
    where: SupersBundleSumWhere
    orderBy?: { _sum: { amountMicros: 'asc' | 'desc' } }
    limit?: number
    offset?: number
  }) => Promise<SupersBundleSums>

  /**
   * Sumの件数を返す
   **/
  countSum: (args: { where: SupersBundleSumWhere }) => Promise<number>
}
