import { Injectable } from '@nestjs/common'
import {
  CheeredUsage,
  CheeredUsages,
  FanUsage,
  FanUsages,
  UsedCount
} from '@domain/cheer-ticket-usage'
import {
  CheerRankingRepository,
  RankingWhere
} from '@domain/cheer-ticket-usage/CheerRanking.repository'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import {
  buildWhereClause,
  buildLimitOffsetClause
} from '@infra/cheer-ticket-usage/utils/buildCheerRankingSQL'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class CheerRankingRepositoryImpl implements CheerRankingRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findCheeredRanking: CheerRankingRepository['findCheeredRanking'] = async ({
    where,
    limit,
    offset
  }) => {
    const rows = await this.executeRankingQuery<{
      channelId: string
      totalUsed: number
    }>('"channelId"', '"channelId"', where, limit, offset)

    return new CheeredUsages(
      rows.map(
        row =>
          new CheeredUsage({
            channelId: new ChannelId(row.channelId),
            usedCount: new UsedCount(row.totalUsed)
          })
      )
    )
  }

  countCheeredRanking: CheerRankingRepository['countCheeredRanking'] = async ({
    where
  }) => {
    return await this.executeCountQuery('"channelId"', where)
  }

  findFanRanking: CheerRankingRepository['findFanRanking'] = async ({
    where,
    limit,
    offset
  }) => {
    const rows = await this.executeRankingQuery<{
      userId: number
      totalUsed: number
    }>('"userId"', '"userId"', where, limit, offset)

    return new FanUsages(
      rows.map(
        row =>
          new FanUsage({
            userId: new UserId(row.userId),
            usedCount: new UsedCount(row.totalUsed)
          })
      )
    )
  }

  countFanRanking: CheerRankingRepository['countFanRanking'] = async ({
    where
  }) => {
    return await this.executeCountQuery('"userId"', where)
  }

  private async executeRankingQuery<T>(
    selectCol: string,
    groupBy: string,
    where: RankingWhere & { channelId?: ChannelId },
    limit?: number,
    offset?: number
  ): Promise<T[]> {
    const whereClause = buildWhereClause(where, 1)
    const limitOffsetClause = buildLimitOffsetClause(
      limit,
      offset,
      whereClause.values.length + 1
    )

    const sql = `
      SELECT
        ${selectCol},
        SUM("usedCount")::int AS "totalUsed"
      FROM "CheerTicketUsage"
      WHERE ${whereClause.text}
      GROUP BY ${groupBy}
      ORDER BY "totalUsed" DESC, MIN("usedAt") ASC
      ${limitOffsetClause.text}
    `

    return await this.prismaInfraService.$queryRawUnsafe<T[]>(
      sql,
      ...whereClause.values,
      ...limitOffsetClause.values
    )
  }

  private async executeCountQuery(
    distinctCol: string,
    where: RankingWhere & { channelId?: ChannelId }
  ): Promise<number> {
    const whereClause = buildWhereClause(where, 1)

    const sql = `
      SELECT COUNT(DISTINCT ${distinctCol}) AS count
      FROM "CheerTicketUsage"
      WHERE ${whereClause.text}
    `

    const result = await this.prismaInfraService.$queryRawUnsafe<
      { count: bigint }[]
    >(sql, ...whereClause.values)

    return Number(result[0]?.count ?? 0)
  }
}
