import { Injectable } from '@nestjs/common'
import { AmountMicros } from '@domain/lib/currency'
import { PeriodString, PeriodStrings } from '@domain/lib/period'
import {
  SupersSummaryRepository,
  SupersSummary,
  SupersSummaries,
  SupersSummaryFindAllWhere
} from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type {
  Prisma,
  YoutubeStreamSupersSummary as PrismaYoutubeStreamSupersSummary
} from '@prisma/generated/client'

const toPrismaWhere = (
  where?: SupersSummaryFindAllWhere
): Prisma.YoutubeStreamSupersSummaryLatestWhereInput => {
  const channelIds = where?.channelIds?.map(e => e.get())
  const group = where?.group?.get()
  const gender = where?.gender?.get()

  // PeriodStrings に含まれるキーについて条件を動的に生成
  const periodConditions: Partial<
    Record<
      PeriodString,
      {
        gt?: bigint
        gte?: bigint
        lt?: bigint
        lte?: bigint
      }
    >
  > = {}
  for (const period of PeriodStrings) {
    const column = where?.[period] || {}
    if (Object.keys(column).length > 0) {
      periodConditions[period] = {
        ...(column?.gt && { gt: column.gt.toBigInt() }),
        ...(column?.gte && { gte: column.gte.toBigInt() }),
        ...(column?.lt && { lt: column.lt.toBigInt() }),
        ...(column?.lte && { lte: column.lte.toBigInt() })
      }
    }
  }

  return {
    channelId: { in: channelIds },
    channel: { group, gender },
    ...periodConditions
  }
}

@Injectable()
export class SupersSummaryRepositoryImpl implements SupersSummaryRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit = 30,
    offset = 0
  }: Parameters<SupersSummaryRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.youtubeStreamSupersSummaryLatest.findMany({
        where: toPrismaWhere(where),
        orderBy,
        take: limit,
        skip: offset
      })
    return new SupersSummaries(rows.map(row => this.toDomain(row)))
  }

  count: SupersSummaryRepository['count'] = async ({ where }) => {
    return await this.prismaInfraService.youtubeStreamSupersSummaryLatest.count(
      { where: toPrismaWhere(where) }
    )
  }

  findOne: (args: {
    where: { channelId: ChannelId }
  }) => Promise<SupersSummary | null> = async ({ where: { channelId } }) => {
    const row =
      await this.prismaInfraService.youtubeStreamSupersSummaryLatest.findFirst({
        where: { channelId: channelId.get() }
      })
    if (!row) return null
    return this.toDomain(row)
  }

  findHistories: SupersSummaryRepository['findHistories'] = async ({
    where: { channelId, createdAt },
    limit,
    offset
  }) => {
    const rows =
      await this.prismaInfraService.youtubeStreamSupersSummary.findMany({
        where: {
          channelId: channelId.get(),
          createdAt: { gte: createdAt.gte, lte: createdAt.lte }
        },
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset
      })
    return new SupersSummaries(rows.map(row => this.toDomain(row)))
  }

  async create({ data }: Parameters<SupersSummaryRepository['create']>[0]) {
    const prisma = this.prismaInfraService
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

    const prismaData = {
      last7Days: last7Days.toBigInt(),
      last30Days: last30Days.toBigInt(),
      last90Days: last90Days.toBigInt(),
      last1Year: last1Year.toBigInt(),
      thisWeek: thisWeek.toBigInt(),
      thisMonth: thisMonth.toBigInt(),
      thisYear: thisYear.toBigInt(),
      createdAt
    }

    await prisma.$transaction(
      async tx => {
        // 最新の情報に更新する
        await tx.youtubeStreamSupersSummaryLatest.upsert({
          where: { channelId: channelId.get() },
          update: prismaData,
          create: { channelId: channelId.get(), ...prismaData }
        })
        // Historyに残す（過去との差分を計算するため）
        await tx.youtubeStreamSupersSummary.create({
          data: { channelId: channelId.get(), ...prismaData }
        })
      },
      {
        maxWait: 10000, // デフォルト: 2000ms
        timeout: 30000 // デフォルト: 5000ms
      }
    )
  }

  private toDomain(row: Omit<PrismaYoutubeStreamSupersSummary, 'id'>) {
    return new SupersSummary({
      channelId: new ChannelId(row.channelId),
      last7Days: new AmountMicros(row.last7Days),
      last30Days: new AmountMicros(row.last30Days),
      last90Days: new AmountMicros(row.last90Days),
      last1Year: new AmountMicros(row.last1Year),
      thisWeek: new AmountMicros(row.thisWeek),
      thisMonth: new AmountMicros(row.thisMonth),
      thisYear: new AmountMicros(row.thisYear),
      createdAt: row.createdAt
    })
  }
}
