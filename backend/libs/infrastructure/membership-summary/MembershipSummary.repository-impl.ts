import { Injectable } from '@nestjs/common'
import { AmountMicros } from '@domain/lib/currency'
import { Period } from '@domain/lib/period'
import { Count } from '@domain/membership'
import {
  MembershipSummaries,
  MembershipSummary,
  MembershipSummaryFindAllWhere,
  MembershipSummaryRepository
} from '@domain/membership-summary'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type {
  Prisma,
  ChannelMembershipSummary as PrismaChannelMembershipSummary
} from '@prisma/generated/client'

const toPrismaWhere = (
  where?: MembershipSummaryFindAllWhere
): Prisma.ChannelMembershipSummaryLatestWhereInput => {
  const period = where?.period.get()
  const channelIds = where?.channelIds?.map(e => e.get())
  const group = where?.group?.get()
  const gender = where?.gender?.get()
  const count = where?.count && {
    gt: where.count.gt?.get(),
    gte: where.count.gte?.get(),
    lt: where.count.lt?.get(),
    lte: where.count.lte?.get()
  }
  return {
    period,
    channelId: { in: channelIds },
    channel: { group, gender },
    count
  }
}

@Injectable()
export class MembershipSummaryRepositoryImpl
  implements MembershipSummaryRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit = 20,
    offset = 0
  }: Parameters<MembershipSummaryRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.channelMembershipSummaryLatest.findMany({
        where: toPrismaWhere(where),
        orderBy,
        take: limit,
        skip: offset
      })
    return new MembershipSummaries(rows.map(row => this.toDomain(row)))
  }

  count: MembershipSummaryRepository['count'] = async ({ where }) => {
    return await this.prismaInfraService.channelMembershipSummaryLatest.count({
      where: toPrismaWhere(where)
    })
  }

  findOne: MembershipSummaryRepository['findOne'] = async ({
    where: { channelId, period }
  }) => {
    const row =
      await this.prismaInfraService.channelMembershipSummaryLatest.findFirst({
        where: { channelId: channelId.get(), period: period.get() }
      })
    if (!row) return null
    return this.toDomain(row)
  }

  findHistories: MembershipSummaryRepository['findHistories'] = async ({
    where: { channelId, period, createdAt },
    limit,
    offset
  }) => {
    const rows =
      await this.prismaInfraService.channelMembershipSummary.findMany({
        where: {
          channelId: channelId.get(),
          period: period.get(),
          createdAt: { gte: createdAt.gte, lte: createdAt.lte }
        },
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset
      })
    return new MembershipSummaries(rows.map(row => this.toDomain(row)))
  }

  async create({ data }: Parameters<MembershipSummaryRepository['create']>[0]) {
    const prisma = this.prismaInfraService
    const { channelId, period, count, amountMicros, createdAt } = data

    const prismaData = {
      channelId: channelId.get(),
      period: period.get(),
      amountMicros: amountMicros.toBigInt(),
      count: count.get(),
      createdAt
    }

    await prisma.$transaction(
      async tx => {
        // 最新の情報に更新する
        await tx.channelMembershipSummaryLatest.upsert({
          where: {
            channelId_period: { channelId: channelId.get(), period: period.get() }
          },
          update: prismaData,
          create: prismaData
        })
        // Historyに残す（過去との差分を計算するため）
        await tx.channelMembershipSummary.create({
          data: prismaData
        })
      },
      {
        maxWait: 10000, // デフォルト: 2000ms
        timeout: 30000 // デフォルト: 5000ms
      }
    )
  }

  private toDomain(row: Omit<PrismaChannelMembershipSummary, 'id'>) {
    return new MembershipSummary({
      channelId: new ChannelId(row.channelId),
      period: new Period(row.period),
      count: new Count(row.count),
      amountMicros: new AmountMicros(row.amountMicros),
      createdAt: row.createdAt
    })
  }
}
