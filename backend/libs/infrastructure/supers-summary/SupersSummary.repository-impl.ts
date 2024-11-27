import { Injectable } from '@nestjs/common'
import BigNumber from 'bignumber.js'
import { AmountMicros } from '@domain/supers'
import {
  SupersSummaryRepository,
  SupersSummary,
  SupersSummaries
} from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type { YoutubeStreamSupersSummary as PrismaYoutubeStreamSupersSummary } from '@prisma/client'

@Injectable()
export class SupersSummaryRepositoryImpl implements SupersSummaryRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit = 30,
    offset = 0
  }: Parameters<SupersSummaryRepository['findAll']>[0]) {
    const channelId = where?.channelId?.get() || null
    const group = where?.group?.get() || null

    const rows = await this.prismaInfraService.$queryRaw<
      PrismaYoutubeStreamSupersSummary[]
    >`
        SELECT DISTINCT ON (s."channelId") s.*
        FROM "YoutubeStreamSupersSummary" AS s
        INNER JOIN "Channel" AS c ON s."channelId" = c."id"
        WHERE 
          s."channelId" IS NOT DISTINCT FROM ${channelId} AND
          c."group" IS NOT DISTINCT FROM ${group}
        ORDER BY 
          s."channelId",
          s."createdAt" DESC,
          CASE 
            WHEN ${orderBy} = 'last7Days' THEN "last7Days"
            WHEN ${orderBy} = 'last30Days' THEN "last30Days"
            WHEN ${orderBy} = 'last90Days' THEN "last90Days"
            WHEN ${orderBy} = 'last1Year' THEN "last1Year"
            WHEN ${orderBy} = 'thisWeek' THEN "thisWeek"
            WHEN ${orderBy} = 'thisMonth' THEN "thisMonth"
            WHEN ${orderBy} = 'thisYear' THEN "thisYear"
          END DESC
        LIMIT ${limit}
        OFFSET ${offset};
      `

    return new SupersSummaries(rows.map(row => this.toDomain(row)))
  }

  findLatest: (args: {
    where: { channelId: ChannelId }
  }) => Promise<SupersSummary | null> = async ({ where: { channelId } }) => {
    const row =
      await this.prismaInfraService.youtubeStreamSupersSummary.findFirst({
        where: { channelId: channelId.get() },
        orderBy: { createdAt: 'desc' }
      })
    if (!row) return null
    return this.toDomain(row)
  }

  async create({ data }: Parameters<SupersSummaryRepository['create']>[0]) {
    const {
      channelId,
      last7Days,
      last30Days,
      last90Days,
      last1Year,
      thisWeek,
      thisMonth,
      thisYear,
      createdAt
    } = data

    await this.prismaInfraService.youtubeStreamSupersSummary.create({
      data: {
        channelId: channelId.get(),
        last7Days: last7Days.toBigInt(),
        last30Days: last30Days.toBigInt(),
        last90Days: last90Days.toBigInt(),
        last1Year: last1Year.toBigInt(),
        thisWeek: thisWeek.toBigInt(),
        thisMonth: thisMonth.toBigInt(),
        thisYear: thisYear.toBigInt(),
        createdAt
      }
    })
  }

  private toDomain(row: PrismaYoutubeStreamSupersSummary) {
    return new SupersSummary({
      channelId: new ChannelId(row.channelId),
      last7Days: new AmountMicros(BigNumber(row.last7Days.toString())),
      last30Days: new AmountMicros(BigNumber(row.last30Days.toString())),
      last90Days: new AmountMicros(BigNumber(row.last90Days.toString())),
      last1Year: new AmountMicros(BigNumber(row.last1Year.toString())),
      thisWeek: new AmountMicros(BigNumber(row.thisWeek.toString())),
      thisMonth: new AmountMicros(BigNumber(row.thisMonth.toString())),
      thisYear: new AmountMicros(BigNumber(row.thisYear.toString())),
      createdAt: row.createdAt
    })
  }
}
