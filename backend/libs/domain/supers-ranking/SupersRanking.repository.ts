import { Period } from '@domain/lib/period'
import { RankingType } from '@domain/ranking'
import { SupersRanking, SupersRankings } from '@domain/supers-ranking'
import { ChannelId, ChannelIds } from '@domain/youtube'

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

  /**
   * 過去24時間の順位を計算して取得する
   *
   * インターフェースは履歴（Hisotry）にも対応できるようcreatedAtを遵守する
   * ので、呼び出し側で24時間のDateを指定する
   */
  calcAllUsingBundle: (args: {
    where: {
      channelIds: ChannelIds
      rankingType: RankingType
      createdAt: { gte: Date; lte: Date } // 基本 lte - gte = 24時間
    }
  }) => Promise<SupersRankings>

  /** チャンネルの最新の順位を取得 */
  findAggregatedOne: (args: {
    where: { channelId: ChannelId; period: Period; rankingType: RankingType }
  }) => Promise<SupersRanking | null>

  /** チャンネルの順位推移を取得 */
  findHistories: (args: {
    where: {
      channelIds: ChannelIds
      period: Period
      rankingType: RankingType
      createdAt: { gte: Date; lte: Date }
    }
    limit?: number
  }) => Promise<SupersRankings>
}
