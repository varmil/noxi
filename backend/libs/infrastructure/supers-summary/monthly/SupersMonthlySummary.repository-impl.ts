import { Injectable } from '@nestjs/common'
import { AmountMicros } from '@domain/lib/currency'
import {
  SupersMonthlySummaryRepository,
  SupersMonthlySummaries,
  SupersMonthlySummary
} from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface Row {
  channelId: string
  createdAt: Date
  thisMonth: bigint
}

@Injectable()
export class SupersMonthlySummaryRepositoryImpl
  implements SupersMonthlySummaryRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    limit = 12,
    offset = 0
  }: Parameters<SupersMonthlySummaryRepository['findAll']>[0]) {
    let rows = await this.prismaInfraService.$queryRaw<Row[]>`
      WITH MonthlyMax AS (
        SELECT
          channelId,
          DATE_TRUNC('month', "createdAt") AS month,
          MAX("createdAt") AS max_date
        FROM "YoutubeStreamSupersSummary"
        WHERE channelId = ${where.channelId.get()}
        GROUP BY channelId, month
        ORDER BY month DESC
        LIMIT ${limit}
        OFFSET ${offset}
      )
      SELECT y."channelId", y."createdAt", y."thisMonth"
      FROM "YoutubeStreamSupersSummary" y
      INNER JOIN MonthlyMax m
      ON y.channelId = m.channelId AND y."createdAt" = m.max_date
      ORDER BY y."createdAt" DESC;
    `

    rows = rows.reverse()
    return new SupersMonthlySummaries(rows.map(row => this.toDomain(row)))
  }

  private toDomain(row: Row) {
    return new SupersMonthlySummary({
      channelId: new ChannelId(row.channelId),
      thisMonth: new AmountMicros(row.thisMonth),
      createdAt: row.createdAt
    })
  }
}
