import {
  CheeredUsages,
  CheerTicketUsage,
  CheerTicketUsages,
  FanUsages
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
    limit?: number
    offset?: number
  }) => Promise<CheerTicketUsages>

  /**
   * 応援したUserのランキング
   */
  findFanRanking: (args: {
    where: RankingWhere
    limit: number
    offset?: number
  }) => Promise<FanUsages>

  /**
   * 応援されたChannelのランキング
   */
  findCheeredRanking: (args: {
    where: RankingWhere
    limit: number
    offset?: number
  }) => Promise<CheeredUsages>
}
