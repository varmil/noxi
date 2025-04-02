import { Injectable } from '@nestjs/common'
import { type ChannelSupersRanking as PrismaChannelSupersRanking } from '@prisma/client'
import { Period } from '@domain/lib/period'
import { RankingType } from '@domain/ranking'
import {
  Rank,
  SupersRanking,
  SupersRankingRepository,
  SupersRankings
} from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SupersRankingRepositoryImpl implements SupersRankingRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  createMany: SupersRankingRepository['createMany'] = async ({
    data: { period, rankingType }
  }) => {
    // rankingTypeによって順位算出時のPARTITION BY句が変わる
    let rankOver = ''
    switch (true) {
      case rankingType.isOverall():
        rankOver = `RANK() OVER (ORDER BY "${period.get()}" DESC)`
        break
      case rankingType.isGender():
        rankOver = `RANK() OVER (PARTITION BY c.gender ORDER BY "${period.get()}" DESC)`
        break
      case rankingType.isGroup():
        rankOver = `RANK() OVER (PARTITION BY c.group ORDER BY "${period.get()}" DESC)`
        break
    }

    await this.prismaInfraService.$executeRawUnsafe(`
      INSERT INTO
        "ChannelSupersRanking" ("channelId", "period", "rankingType", "rank", "createdAt")
      WITH x AS (
        SELECT
          "channelId",
          "${period.get()}",
          ${rankOver} AS rank
        FROM "YoutubeStreamSupersSummaryLatest" summary
        JOIN "Channel" c ON summary."channelId" = c."id"
        WHERE summary."${period.get()}" > 0
      )
      SELECT "channelId", '${period.get()}', '${rankingType.get()}', rank, NOW()
      FROM x;
    `)
  }

  calcAllUsingBundle: SupersRankingRepository['calcAllUsingBundle'] = async ({
    where: { channelIds, rankingType, createdAt }
  }) => {
    // rankingTypeによって順位算出時のPARTITION BY句, GROUP BY句が変わる
    let rankOver = ''
    let groupBy = ''
    switch (true) {
      case rankingType.isOverall():
        rankOver = `RANK() OVER (ORDER BY SUM("amountMicros") DESC)`
        groupBy = `GROUP BY "channelId"`
        break
      case rankingType.isGender():
        rankOver = `RANK() OVER (PARTITION BY channel.gender ORDER BY SUM("amountMicros") DESC)`
        groupBy = `GROUP BY "channelId", channel.gender`
        break
      case rankingType.isGroup():
        rankOver = `RANK() OVER (PARTITION BY channel.group ORDER BY SUM("amountMicros") DESC)`
        groupBy = `GROUP BY "channelId", channel.group`
        break
    }

    const createdAtWhere = `
      bundle."createdAt" >= '${createdAt.gte.toISOString()}' AND 
      bundle."createdAt" <= '${createdAt.lte.toISOString()}'`

    const rows = await this.prismaInfraService.$queryRawUnsafe<
      {
        channelId: string
        period: string
        rankingType: string
        rank: number
        createdAt: Date
      }[]
    >(`
      SELECT "channelId", "period", "rankingType", "rank"::int, "createdAt" FROM (
        SELECT
          "channelId",
          'last24Hours' AS "period",
          '${rankingType.get()}' AS "rankingType",
          ${rankOver} AS "rank",
          MAX("createdAt") AS "createdAt"
        FROM "YoutubeStreamSupersBundle" bundle
        INNER JOIN "Channel" channel ON bundle."channelId" = channel."id"
        WHERE ${createdAtWhere} AND "amountMicros" > 0
        ${groupBy}
      ) sub
      WHERE
        "channelId" IN (${channelIds.map(channelId => `'${channelId.get()}'`).join(',')})
    `)
    return new SupersRankings(rows.map(row => this.toDomain(row)))
  }

  findAggregatedOne: SupersRankingRepository['findAggregatedOne'] = async ({
    where: { channelId, period, rankingType }
  }) => {
    const row = await this.prismaInfraService.channelSupersRanking.findFirst({
      where: {
        channelId: channelId.get(),
        period: period.get(),
        rankingType: rankingType.get()
      },
      orderBy: { createdAt: 'desc' }
    })
    if (!row) return null
    return this.toDomain(row)
  }

  findHistories: SupersRankingRepository['findHistories'] = async ({
    where: { channelIds, period, rankingType, createdAt },
    limit
  }) => {
    const rows = await this.prismaInfraService.channelSupersRanking.findMany({
      where: {
        channelId: { in: channelIds.map(channelId => channelId.get()) },
        period: period.get(),
        rankingType: rankingType.get(),
        createdAt: { gte: createdAt.gte, lte: createdAt.lte }
      },
      orderBy: { createdAt: 'asc' },
      take: limit
    })
    return new SupersRankings(rows.map(row => this.toDomain(row)))
  }

  private toDomain(row: Omit<PrismaChannelSupersRanking, 'id'>) {
    return new SupersRanking({
      channelId: new ChannelId(row.channelId),
      period: new Period(row.period),
      rankingType: new RankingType(row.rankingType),
      rank: new Rank(row.rank),
      createdAt: row.createdAt
    })
  }
}
