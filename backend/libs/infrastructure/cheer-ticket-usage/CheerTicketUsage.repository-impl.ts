import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import {
  CheeredUsage,
  CheeredUsages,
  CheerTicketUsage,
  CheerTicketUsageRepository,
  CheerTicketUsages,
  FanUsage,
  FanUsages,
  Rank,
  UsedAt,
  UsedCount
} from '@domain/cheer-ticket-usage'
import { Group } from '@domain/group'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class CheerTicketUsageRepositoryImpl
  implements CheerTicketUsageRepository
{
  private readonly logger = new Logger(CheerTicketUsageRepositoryImpl.name)
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  consume: CheerTicketUsageRepository['consume'] = async ({ data }) => {
    const { userId, channelId, usedCount, group, usedAt } = data
    const usedCountNumber = usedCount.get()

    await this.prismaInfraService.$transaction(async tx => {
      // SELECT FOR UPDATE でロック
      const [ticket] = await tx.$queryRawUnsafe<{ totalCount: number }[]>(
        `SELECT * FROM "CheerTicket" WHERE "userId" = $1 FOR UPDATE`,
        userId.get()
      )
      if (!ticket || ticket.totalCount < usedCountNumber) {
        throw new UnprocessableEntityException('チケットが足りません')
      }

      // 保有数を更新
      await tx.cheerTicket.update({
        where: { userId: userId.get() },
        data: {
          totalCount: ticket.totalCount - usedCountNumber
        }
      })

      // 消費ログを作成
      await tx.cheerTicketUsage.create({
        data: {
          userId: userId.get(),
          channelId: channelId.get(),
          group: group.get(),
          usedCount: usedCountNumber,
          usedAt: usedAt.get()
        }
      })
    })
  }

  findAll: CheerTicketUsageRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.cheerTicketUsage.findMany({
      where: {
        userId: where.userId?.get(),
        channelId: where.channelId?.get(),
        group: where.group?.get(),
        usedAt: where.usedAt
      },
      orderBy,
      take: limit,
      skip: offset
    })
    return new CheerTicketUsages(
      rows.map(
        row =>
          new CheerTicketUsage({
            userId: new UserId(row.userId),
            channelId: new ChannelId(row.channelId),
            group: new Group(row.group),
            usedCount: new UsedCount(row.usedCount),
            usedAt: new UsedAt(row.usedAt)
          })
      )
    )
  }

  findCheeredRanking: CheerTicketUsageRepository['findCheeredRanking'] =
    async ({ where, limit, offset }) => {
      const conditions: string[] = []
      const values: (string | number | Date)[] = []
      let index = 1

      if (where.group) {
        conditions.push(`"group" = $${index++}`)
        values.push(where.group.get())
      }
      if (where.usedAt?.gte) {
        conditions.push(`"usedAt" >= $${index++}`)
        values.push(where.usedAt.gte)
      }
      if (where.usedAt?.lte) {
        conditions.push(`"usedAt" <= $${index++}`)
        values.push(where.usedAt.lte)
      }

      const rankings = await this.prismaInfraService.$queryRawUnsafe<
        { channelId: string; totalUsed: number }[]
      >(
        `
        SELECT
          "channelId",
          SUM("usedCount") AS "totalUsed"
        FROM "CheerTicketUsage"
        WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
        GROUP BY "channelId"
        ORDER BY "totalUsed" DESC
        LIMIT ${limit}
        OFFSET ${offset}
        `,
        ...values
      )
      return new CheeredUsages(
        rankings.map(
          row =>
            new CheeredUsage({
              channelId: new ChannelId(row.channelId),
              usedCount: new UsedCount(row.totalUsed)
            })
        )
      )
    }

  findFanRanking: CheerTicketUsageRepository['findFanRanking'] = async ({
    where,
    limit,
    offset
  }) => {
    const conditions: string[] = []
    const values: (string | number | Date)[] = []
    let index = 1

    if (where.group) {
      conditions.push(`"group" = $${index++}`)
      values.push(where.group.get())
    }
    if (where.channelId) {
      conditions.push(`"channelId" = $${index++}`)
      values.push(where.channelId.get())
    }
    if (where.usedAt?.gte) {
      conditions.push(`"usedAt" >= $${index++}`)
      values.push(where.usedAt.gte)
    }
    if (where.usedAt?.lte) {
      conditions.push(`"usedAt" <= $${index++}`)
      values.push(where.usedAt.lte)
    }

    const rankings = await this.prismaInfraService.$queryRawUnsafe<
      { userId: number; totalUsed: number }[]
    >(
      `
      SELECT
        "userId",
        SUM("usedCount") AS "totalUsed"
      FROM "CheerTicketUsage"
      WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
      GROUP BY "userId"
      ORDER BY "totalUsed" DESC
      LIMIT ${limit}
      OFFSET ${offset}
      `,
      ...values
    )
    return new FanUsages(
      rankings.map(
        row =>
          new FanUsage({
            userId: new UserId(row.userId),
            usedCount: new UsedCount(row.totalUsed)
          })
      )
    )
  }

  findCheeredRank: CheerTicketUsageRepository['findCheeredRank'] = async ({
    where
  }) => {
    const conditions: string[] = []
    const values: (string | number | Date)[] = []
    let index = 1

    if (where.group) {
      conditions.push(`"group" = $${index++}`)
      values.push(where.group.get())
    }
    if (where.usedAt?.gte) {
      conditions.push(`"usedAt" >= $${index++}`)
      values.push(where.usedAt.gte)
    }
    if (where.usedAt?.lte) {
      conditions.push(`"usedAt" <= $${index++}`)
      values.push(where.usedAt.lte)
    }
    values.push(where.channelId.get()) // 最後に channelId
    const channelIdIndex = index++

    const result = await this.prismaInfraService.$queryRawUnsafe<
      { rank: number }[]
    >(
      `
      SELECT "rank"::int
      FROM (
        SELECT
          RANK() OVER (ORDER BY SUM("usedCount") DESC) AS "rank"
        FROM "CheerTicketUsage"
        WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
        GROUP BY "channelId"
      ) ranked
      WHERE "channelId" = $${channelIdIndex}
    `,
      ...values
    )

    return result[0]?.rank ? new Rank(result[0].rank) : null
  }

  findFanRank: CheerTicketUsageRepository['findFanRank'] = async ({
    where
  }) => {
    const conditions: string[] = []
    const values: (string | number | Date)[] = []
    let index = 1

    if (where.group) {
      conditions.push(`"group" = $${index++}`)
      values.push(where.group.get())
    }
    if (where.channelId) {
      conditions.push(`"channelId" = $${index++}`)
      values.push(where.channelId.get())
    }
    if (where.usedAt?.gte) {
      conditions.push(`"usedAt" >= $${index++}`)
      values.push(where.usedAt.gte)
    }
    if (where.usedAt?.lte) {
      conditions.push(`"usedAt" <= $${index++}`)
      values.push(where.usedAt.lte)
    }
    values.push(where.userId.get()) // 最後に userId
    const userIdIndex = index++

    const result = await this.prismaInfraService.$queryRawUnsafe<
      { rank: number }[]
    >(
      `
      SELECT "rank"::int
      FROM (
        SELECT
          RANK() OVER (ORDER BY SUM("usedCount") DESC) AS "rank"
        FROM "CheerTicketUsage"
        WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
        GROUP BY "userId"
      ) ranked
      WHERE "userId" = $${userIdIndex}
    `,
      ...values
    )

    return result[0]?.rank ? new Rank(result[0].rank) : null
  }
}
