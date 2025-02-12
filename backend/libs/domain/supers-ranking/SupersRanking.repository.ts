import { Period } from '@domain/lib/period'
import {
  RankingType,
  SupersRanking,
  SupersRankings
} from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'

export interface SupersRankingRepository {
  /**
   * 指定した期間x切り口の順位表を算出し、全チャンネル一気にINSERTする
   * summary."${period}" > 0 のもののみ順位を割り当てる。
   * 0の場合はそもそもINSERTしない（＝ランキング圏外）
   **/
  createMany: (args: {
    data: {
      period: Period
      rankingType: RankingType
    }
  }) => Promise<void>

  /** 「過去24時間」の最新の順位を計算して取得 */
  calcLast24HoursOne: (args: {
    where: { channelId: ChannelId; rankingType: RankingType }
  }) => Promise<SupersRanking | null>

  /** チャンネルの最新の順位を取得 */
  findAggregatedOne: (args: {
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
    limit?: number
  }) => Promise<SupersRankings>
}
