import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import { AmountMicros } from '@domain/lib/currency'
import { RankingType } from '@domain/ranking'
import {
  SupersBundle,
  SupersBundles,
  SupersBundleSums,
  VideoRank,
  VideoRanks
} from '@domain/supers-bundle'
import { ChannelId, ChannelIds, VideoId, VideoIds } from '@domain/youtube'

interface SupersBundleFindAllWhere {
  videoIds?: VideoIds
  channelId?: ChannelId
  amountMicros?: {
    gt?: AmountMicros
    gte?: AmountMicros
    lt?: AmountMicros
    lte?: AmountMicros
  }
  group?: GroupId
  gender?: Gender
  // NULL means "live now"
  actualEndTime?: null
  createdAt?: { gte?: Date; lte?: Date }
}

export interface AmountMicrosSum {
  channelId: ChannelId
  amountMicros: AmountMicros
}

export interface SupersBundleSumWhere {
  createdAt: { gte: Date; lte?: Date }
  group?: GroupId
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
    where?: SupersBundleFindAllWhere
    orderBy?: Partial<Record<'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<SupersBundles>

  count: (args: { where?: SupersBundleFindAllWhere }) => Promise<number>

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<SupersBundle | null>

  findRank: (args: {
    where: { videoId: VideoId; rankingType: RankingType }
  }) => Promise<VideoRank | null>

  findRanks: (args: {
    where: { videoIds: VideoIds; rankingType: RankingType }
  }) => Promise<VideoRanks>

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
