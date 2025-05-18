import {
  CheeredUsages,
  FanRank,
  CheerTicketUsage,
  CheerTicketUsages,
  FanUsages,
  CheeredRank
} from '@domain/cheer-ticket-usage'
import { Group } from '@domain/group'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

interface RankingWhere {
  group?: Group
  usedAt?: {
    gte: Date
    lte?: Date
  }
}
interface FindAllWhere extends RankingWhere {
  userId?: UserId
  channelId?: ChannelId
}

export interface CheerTicketUsageRepository {
  consume: (args: { data: CheerTicketUsage }) => Promise<void>

  findAll: (args: {
    where: FindAllWhere
    orderBy?: Partial<Record<'usedAt' | 'usedCount', 'asc' | 'desc'>>[]
    limit: number
    offset?: number
  }) => Promise<CheerTicketUsages>

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

  /** 指定された集合の中での特定のChannelの順位を取得 */
  findCheeredRank: (args: {
    where: RankingWhere & { channelId: ChannelId }
  }) => Promise<CheeredRank | null>

  /** 指定された集合の中での特定のFan（User）の順位を取得 */
  findFanRank: (args: {
    /**
     * group指定    ：特定のグループに対する貢献量
     * channelId指定：特定のChannelに対する貢献量
     */
    where: RankingWhere & { userId: UserId; channelId?: ChannelId }
  }) => Promise<FanRank | null>
}
