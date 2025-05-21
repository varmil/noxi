import {
  FanRank,
  CheerTicketUsage,
  CheerTicketUsages,
  CheeredRank
} from '@domain/cheer-ticket-usage'
import { RankingWhere } from '@domain/cheer-ticket-usage/CheerRanking.repository'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

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
