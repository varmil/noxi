import { Injectable } from '@nestjs/common'
import { Period } from '@domain/lib/period'
import {
  Rank,
  RankingType,
  SupersRanking,
  SupersRankingRepository,
  SupersRankings
} from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type { ChannelSupersRanking as PrismaChannelSupersRanking } from '@prisma/client'

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

  findOne: SupersRankingRepository['findOne'] = async ({
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
    where: { channelId, period, rankingType, createdAt }
  }) => {
    const rows = await this.prismaInfraService.channelSupersRanking.findMany({
      where: {
        channelId: channelId.get(),
        period: period.get(),
        rankingType: rankingType.get(),
        createdAt: { gte: createdAt.gte, lte: createdAt.lte }
      },
      orderBy: { createdAt: 'asc' }
    })
    return new SupersRankings(rows.map(row => this.toDomain(row)))
  }

  private toDomain(row: PrismaChannelSupersRanking) {
    return new SupersRanking({
      channelId: new ChannelId(row.channelId),
      period: new Period(row.period),
      rankingType: new RankingType(row.rankingType),
      rank: new Rank(row.rank),
      createdAt: row.createdAt
    })
  }
}
