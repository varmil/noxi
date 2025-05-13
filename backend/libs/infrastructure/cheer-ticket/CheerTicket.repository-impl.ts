import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import {
  CheerTicket,
  CheerTicketRepository,
  CheerTickets,
  LastClaimedAt,
  TotalCount
} from '@domain/cheer-ticket'
import { UserId } from '@domain/user'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class CheerTicketRepositoryImpl implements CheerTicketRepository {
  private readonly logger = new Logger(CheerTicketRepositoryImpl.name)
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findAll: CheerTicketRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.cheerTicket.findMany({
      where: {
        userId: { in: where.userIds?.map(e => e.get()) },
        totalCount: where.totalCount
          ? {
              gte: where.totalCount.gte?.get(),
              lte: where.totalCount.lte?.get()
            }
          : undefined,
        lastClaimedAt: where.lastClaimedAt
      },
      orderBy,
      take: limit,
      skip: offset
    })
    return new CheerTickets(
      rows.map(
        row =>
          new CheerTicket({
            userId: new UserId(row.userId),
            totalCount: new TotalCount(row.totalCount),
            lastClaimedAt: new LastClaimedAt(row.lastClaimedAt)
          })
      )
    )
  }

  findByUserId: CheerTicketRepository['findByUserId'] = async userId => {
    const row = await this.prismaInfraService.cheerTicket.findUnique({
      where: { userId: userId.get() }
    })
    return row
      ? new CheerTicket({
          userId: new UserId(row.userId),
          totalCount: new TotalCount(row.totalCount),
          lastClaimedAt: new LastClaimedAt(row.lastClaimedAt)
        })
      : null
  }
}
