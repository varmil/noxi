import { Period } from '@domain/lib/period'
import {
  RankingType,
  SupersRanking,
  SupersRankings
} from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'

export interface SupersRankingRepository {
  /** チャンネルの最新の順位を取得 */
  findOne: (args: {
    where: { channelId: ChannelId; period: Period; rankingType: RankingType }
  }) => Promise<SupersRanking | null>

  /** チャンネルの順位推移を取得 */
  findHistories: (args: {
    where: {
      channelId: ChannelId
      period: Period
      rankingType: RankingType
      createdAt: { gte?: Date; lte?: Date }
    }
  }) => Promise<SupersRankings>

  /** 指定した期間x切り口の順位表を算出し、全チャンネル一気にINSERTする */
  createMany: (args: {
    data: {
      period: Period
      rankingType: RankingType
    }
  }) => Promise<void>
}
