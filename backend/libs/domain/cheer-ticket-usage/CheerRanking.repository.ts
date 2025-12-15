import { CheeredUsages, FanUsages } from '@domain/cheer-ticket-usage'
import { GroupName } from '@domain/group'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

/** For Cheer Ranking */
export interface RankingWhere {
  group?: GroupName
  gender?: Gender
  usedAt?: {
    gte: Date
    lte?: Date
  }
}

/**
 * cheer-ticket-usageをベースに
 * ランキング系の取得のみを提供する
 */
export interface CheerRankingRepository {
  /** 応援されたChannelのランキング */
  findCheeredRanking: (args: {
    where: RankingWhere
    limit: number
    offset?: number
  }) => Promise<CheeredUsages>

  /** 応援したUserのランキング */
  findFanRanking: (args: {
    /**
     * group指定    ：特定のグループに対する貢献量
     * channelId指定：特定のChannelに対する貢献量
     */
    where: RankingWhere & { channelId?: ChannelId }
    limit: number
    offset?: number
  }) => Promise<FanUsages>

  /** 応援されたChannelの総数 */
  countCheeredRanking: (args: { where: RankingWhere }) => Promise<number>

  /** 応援したUserの総数 */
  countFanRanking: (args: {
    where: RankingWhere & { channelId?: ChannelId }
  }) => Promise<number>
}
