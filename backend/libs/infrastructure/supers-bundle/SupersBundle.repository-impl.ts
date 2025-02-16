import { BadRequestException, Injectable } from '@nestjs/common'
import {
  Prisma,
  YoutubeStreamSupersBundle as PrismaYoutubeStreamSupersBundle
} from '@prisma/client'
import BigNumber from 'bignumber.js'
import { AmountMicros, Group } from '@domain'
import {
  SupersBundleRepository,
  SupersBundles,
  SupersBundle,
  SupersCount,
  SupersBundleSums,
  SupersBundleSum
} from '@domain/supers-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SupersBundleRepositoryImpl implements SupersBundleRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<SupersBundleRepository['findAll']>[0]) {
    const whereQuery: Prisma.YoutubeStreamSupersBundleWhereInput | undefined =
      where
        ? {
            videoId: { in: where.videoIds?.map(e => e.get()) },
            channelId: where.channelId?.get(),
            group: where.group?.get(),
            actualEndTime: where.actualEndTime,
            createdAt: where.createdAt,
            channel: { gender: where.gender?.get() }
          }
        : undefined

    const rows =
      await this.prismaInfraService.youtubeStreamSupersBundle.findMany({
        where: whereQuery,
        orderBy,
        take: limit,
        skip: offset
      })

    return new SupersBundles(rows.map(row => this.toDomain(row)))
  }

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<SupersBundle | null> = async ({ where: { videoId } }) => {
    const row =
      await this.prismaInfraService.youtubeStreamSupersBundle.findUnique({
        where: { videoId: videoId.get() }
      })
    if (!row) return null
    return this.toDomain(row)
  }

  async save({ data }: Parameters<SupersBundleRepository['save']>[0]) {
    const {
      videoId,
      channelId,
      amountMicros,
      count,
      actualStartTime,
      actualEndTime,
      group
    } = data

    const update = {
      channelId: channelId.get(),
      amountMicros: amountMicros.toBigInt(),
      count: count.get(),
      actualStartTime: actualStartTime.get(),
      actualEndTime: actualEndTime?.get() ?? null,
      group: group.get()
    }

    await this.prismaInfraService.youtubeStreamSupersBundle.upsert({
      where: { videoId: videoId.get() },
      update,
      create: { videoId: videoId.get(), ...update }
    })
  }

  sum: SupersBundleRepository['sum'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows =
      await this.prismaInfraService.youtubeStreamSupersBundle.groupBy({
        by: ['channelId'],
        where: {
          createdAt: where.createdAt,
          group: where.group?.get(),
          channelId: { in: where.channelIds?.map(e => e.get()) },
          channel: { gender: where.gender?.get() }
        },
        _sum: { amountMicros: true },
        orderBy,
        take: limit,
        skip: offset
      })

    return new SupersBundleSums(
      rows.map(
        row =>
          new SupersBundleSum({
            channelId: new ChannelId(row.channelId),
            amountMicros: new AmountMicros(
              row._sum.amountMicros
                ? BigNumber(row._sum.amountMicros.toString())
                : new BigNumber(0)
            )
          })
      )
    )
  }

  countSum: SupersBundleRepository['countSum'] = async ({ where }) => {
    const {
      createdAt: { gte, lte },
      group,
      channelIds,
      gender
    } = where
    const result = await this.prismaInfraService.$queryRaw<
      { count: number }[]
    >`
      SELECT COUNT(DISTINCT t."channelId") AS count
      FROM "YoutubeStreamSupersBundle" t
      JOIN "Channel" c ON t."channelId" = c."id"
      WHERE t."createdAt" >= ${gte} 
        AND t."createdAt" <= ${lte ?? new Date()}
        ${group ? Prisma.sql`AND t."group" = ${group.get()}` : Prisma.empty}
        ${
          channelIds
            ? Prisma.sql`AND t."channelId" IN (${Prisma.join(channelIds.map(e => e.get()))})`
            : Prisma.empty
        }
        ${gender ? Prisma.sql`AND c."gender" = ${gender.get()}` : Prisma.empty}
    `
    return result[0]?.count ?? 0
  }

  private toDomain(row: PrismaYoutubeStreamSupersBundle) {
    return new SupersBundle({
      videoId: new VideoId(row.videoId),
      channelId: new ChannelId(row.channelId),
      amountMicros: new AmountMicros(BigNumber(row.amountMicros.toString())),
      count: new SupersCount(row.count),
      actualStartTime: new ActualStartTime(row.actualStartTime),
      actualEndTime: row.actualEndTime
        ? new ActualEndTime(row.actualEndTime)
        : undefined,
      group: new Group(row.group)
    })
  }
}
