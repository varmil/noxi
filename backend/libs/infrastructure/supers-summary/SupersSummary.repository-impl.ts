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
    limit,
    offset
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
          (${channelId} IS NULL OR "channelId" = ${channelId})
          AND (${group} IS NULL OR c."group" = ${group})
        ORDER BY 
          s."channelId",
          s."createdAt" DESC,
          CASE 
            WHEN ${orderBy} = 'last7days' THEN "last7days"
            WHEN ${orderBy} = 'last30days' THEN "last30days"
            WHEN ${orderBy} = 'last90days' THEN "last90days"
            WHEN ${orderBy} = 'last1year' THEN "last1year"
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
      last7days,
      last30days,
      last90days,
      last1year,
      thisWeek,
      thisMonth,
      thisYear,
      createdAt
    } = data

    await this.prismaInfraService.youtubeStreamSupersSummary.create({
      data: {
        channelId: channelId.get(),
        last7days: last7days.toBigInt(),
        last30days: last30days.toBigInt(),
        last90days: last90days.toBigInt(),
        last1year: last1year.toBigInt(),
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
      last7days: new AmountMicros(BigNumber(row.last7days.toString())),
      last30days: new AmountMicros(BigNumber(row.last30days.toString())),
      last90days: new AmountMicros(BigNumber(row.last90days.toString())),
      last1year: new AmountMicros(BigNumber(row.last1year.toString())),
      thisWeek: new AmountMicros(BigNumber(row.thisWeek.toString())),
      thisMonth: new AmountMicros(BigNumber(row.thisMonth.toString())),
      thisYear: new AmountMicros(BigNumber(row.thisYear.toString())),
      createdAt: row.createdAt
    })
  }
}
