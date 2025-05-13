import { CheerTicket, CheerTickets, TotalCount } from '@domain/cheer-ticket'
import { UserId, UserIds } from '@domain/user'

interface FindAllWhere {
  userIds?: UserIds
  totalCount?: {
    gte?: TotalCount
    lte?: TotalCount
  }
  lastClaimedAt?: {
    gte?: Date
    lte?: Date
  }
}

export interface CheerTicketRepository {
  findAll: (args: {
    where: FindAllWhere
    orderBy?: Partial<Record<'totalCount' | 'lastClaimedAt', 'asc' | 'desc'>>[]
    limit: number
    offset?: number
  }) => Promise<CheerTickets>

  findByUserId: (userId: UserId) => Promise<CheerTicket | null>
}
