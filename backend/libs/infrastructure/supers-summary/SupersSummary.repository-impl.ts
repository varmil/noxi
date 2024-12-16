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
    const channelIds = where?.channelIds?.map(e => e.get())
    const group = where?.group?.get()
    const gender = where?.gender?.get()

    const rows =
      await this.prismaInfraService.youtubeStreamSupersSummaryLatest.findMany({
        where: { channelId: { in: channelIds }, channel: { group, gender } },
        orderBy,
        take: limit,
        skip: offset
      })
    return new SupersSummaries(rows.map(row => this.toDomain(row)))
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
    where: { channelId, createdAt }
  }) => {
    const rows =
      await this.prismaInfraService.youtubeStreamSupersSummary.findMany({
        where: {
          channelId: channelId.get(),
          createdAt: { gte: createdAt.gte, lte: createdAt.lte }
        },
        orderBy: { createdAt: 'asc' }
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

    await prisma.$transaction([
      // 最新の情報に更新する
      prisma.youtubeStreamSupersSummaryLatest.upsert({
        where: { channelId: channelId.get() },
        update: prismaData,
        create: { channelId: channelId.get(), ...prismaData }
      }),
      // ログ的に残す（移動平均や分散を計算するため）
      prisma.youtubeStreamSupersSummary.create({
        data: { channelId: channelId.get(), ...prismaData }
      })
    ])
  }

  private toDomain(row: Omit<PrismaYoutubeStreamSupersSummary, 'id'>) {
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
