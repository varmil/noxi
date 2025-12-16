import {
  Injectable,
  UnprocessableEntityException,
  Logger
} from '@nestjs/common'
import {
  CheeredRank,
  CheerTicketUsage,
  CheerTicketUsageRepository,
  CheerTicketUsages,
  Rank,
  UsedAt,
  UsedCount
} from '@domain/cheer-ticket-usage'
import { FanRank } from '@domain/cheer-ticket-usage/ranking/FanRank.entity'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class CheerTicketUsageRepositoryImpl implements CheerTicketUsageRepository {
  private readonly logger = new Logger(CheerTicketUsageRepositoryImpl.name)
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  consume: CheerTicketUsageRepository['consume'] = async ({ data }) => {
    const { userId, channelId, usedCount, group, gender, usedAt } = data
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
          gender: gender.get(),
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
        gender: where.gender?.get(),
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
            group: new GroupId(row.group),
            gender: new Gender(row.gender),
            usedCount: new UsedCount(row.usedCount),
            usedAt: new UsedAt(row.usedAt)
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
      { rank: number; totalCount: number }[]
    >(
      `
      SELECT "rank"::int, "totalCount"::int
      FROM (
        SELECT
          "channelId",
          SUM("usedCount") AS "totalCount",
          RANK() OVER (ORDER BY SUM("usedCount") DESC, MIN("usedAt") ASC) AS "rank"
        FROM "CheerTicketUsage"
        WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
        GROUP BY "channelId"
      ) ranked
      WHERE "channelId" = $${channelIdIndex}
    `,
      ...values
    )

    return result[0]?.rank
      ? new CheeredRank({
          channelId: where.channelId,
          rank: new Rank(result[0].rank),
          usedCount: new UsedCount(result[0].totalCount)
        })
      : null
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
      { rank: number; totalCount: number }[]
    >(
      `
      SELECT "rank"::int, "totalCount"::int
      FROM (
        SELECT
          "userId",
          SUM("usedCount") AS "totalCount",
          RANK() OVER (ORDER BY SUM("usedCount") DESC, MIN("usedAt") ASC) AS "rank"
        FROM "CheerTicketUsage"
        WHERE ${conditions.length ? conditions.join(' AND ') : '1=1'}
        GROUP BY "userId"
      ) ranked
      WHERE "userId" = $${userIdIndex}
    `,
      ...values
    )

    return result[0]?.rank
      ? new FanRank({
          userId: where.userId,
          rank: new Rank(result[0].rank),
          usedCount: new UsedCount(result[0].totalCount)
        })
      : null
  }
}
