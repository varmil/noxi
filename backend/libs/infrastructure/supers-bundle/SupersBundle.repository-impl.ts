import { Injectable } from '@nestjs/common'
import {
  Prisma,
  YoutubeStreamSupersBundle as PrismaYoutubeStreamSupersBundle
} from '@prisma/generated/client'
import { GroupId } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { RankingType } from '@domain/ranking'
import {
  SupersBundleRepository,
  SupersBundles,
  SupersBundle,
  SupersCount,
  SupersBundleSums,
  SupersBundleSum,
  Rank,
  VideoRank,
  TopPercentage
} from '@domain/supers-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

/** パーティション条件を生成 */
const getPartitionCondition = (
  rankingType: RankingType,
  gender: string,
  group: string
) => {
  if (rankingType.isGender()) {
    return Prisma.sql`c."gender" = ${gender}`
  }
  if (rankingType.isGroup()) {
    return Prisma.sql`c."group" = ${group}`
  }
  return Prisma.sql`1=1`
}

@Injectable()
export class SupersBundleRepositoryImpl implements SupersBundleRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<SupersBundleRepository['findAll']>[0]) {
    let amountMicros:
      | Prisma.BigIntFilter<'YoutubeStreamSupersBundle'>
      | undefined
    for (const [key, value] of Object.entries(where?.amountMicros || {})) {
      if (value === undefined) continue // value is optional
      amountMicros = amountMicros
        ? { ...amountMicros, [key]: value.toBigInt() }
        : { [key]: value.toBigInt() }
    }

    const whereQuery: Prisma.YoutubeStreamSupersBundleWhereInput | undefined =
      where
        ? {
            videoId: { in: where.videoIds?.map(e => e.get()) },
            channelId: where.channelId?.get(),
            amountMicros,
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

  count: SupersBundleRepository['count'] = async ({ where }) => {
    let amountMicros:
      | Prisma.BigIntFilter<'YoutubeStreamSupersBundle'>
      | undefined
    for (const [key, value] of Object.entries(where?.amountMicros || {})) {
      if (value === undefined) continue // value is optional
      amountMicros = amountMicros
        ? { ...amountMicros, [key]: value.toBigInt() }
        : { [key]: value.toBigInt() }
    }

    return await this.prismaInfraService.youtubeStreamSupersBundle.count({
      where: where
        ? {
            videoId: { in: where.videoIds?.map(e => e.get()) },
            channelId: where.channelId?.get(),
            amountMicros,
            group: where.group?.get(),
            actualEndTime: where.actualEndTime,
            createdAt: where.createdAt,
            channel: { gender: where.gender?.get() }
          }
        : undefined
    })
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

  findRank: SupersBundleRepository['findRank'] = async ({
    where: { videoId, rankingType }
  }) => {
    // 1. 対象videoIdの情報を取得
    const target = await this.prismaInfraService.$queryRaw<
      { amountMicros: bigint; gender: string; group: string }[]
    >`
      SELECT ysb."amountMicros", c."gender", c."group"
      FROM "YoutubeStreamSupersBundle" ysb
      JOIN "Channel" c ON ysb."channelId" = c."id"
      WHERE ysb."videoId" = ${videoId.get()}
        AND ysb."amountMicros" > 0
    `
    if (!target[0]) return null

    const partitionCondition = getPartitionCondition(
      rankingType,
      target[0].gender,
      target[0].group
    )

    // 2. ランクと総数を計算
    const result = await this.prismaInfraService.$queryRaw<
      { rank: bigint; totalCount: bigint }[]
    >`
      SELECT
        (SELECT COUNT(*) + 1
         FROM "YoutubeStreamSupersBundle" ysb
         JOIN "Channel" c ON ysb."channelId" = c."id"
         WHERE ${partitionCondition}
           AND ysb."amountMicros" > ${target[0].amountMicros}
           AND ysb."amountMicros" > 0) as rank,
        (SELECT COUNT(*)
         FROM "YoutubeStreamSupersBundle" ysb
         JOIN "Channel" c ON ysb."channelId" = c."id"
         WHERE ${partitionCondition}
           AND ysb."amountMicros" > 0) as "totalCount"
    `

    const rank = Number(result[0].rank)
    const totalCount = Number(result[0].totalCount)
    const topPercentage = (rank * 100.0) / totalCount

    return new VideoRank({
      videoId,
      rank: new Rank(rank),
      topPercentage: new TopPercentage(topPercentage)
    })
  }

  save: SupersBundleRepository['save'] = async ({ data }) => {
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
    let amountMicros:
      | Prisma.BigIntFilter<'YoutubeStreamSupersBundle'>
      | undefined
    for (const [key, value] of Object.entries(where.amountMicros || {})) {
      amountMicros = amountMicros
        ? { ...amountMicros, [key]: value.toBigInt() }
        : { [key]: value.toBigInt() }
    }

    const rows =
      await this.prismaInfraService.youtubeStreamSupersBundle.groupBy({
        by: ['channelId'],
        where: {
          createdAt: where.createdAt,
          group: where.group?.get(),
          channelId: { in: where.channelIds?.map(e => e.get()) },
          channel: { gender: where.gender?.get() },
          amountMicros
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
            amountMicros: new AmountMicros(row._sum.amountMicros ?? 0)
          })
      )
    )
  }

  countSum: SupersBundleRepository['countSum'] = async ({ where }) => {
    const { sql, join, empty } = Prisma
    const {
      createdAt: { gte, lte },
      group,
      channelIds: ids,
      amountMicros,
      gender
    } = where
    const result = await this.prismaInfraService.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT t."channelId") AS count
      FROM "YoutubeStreamSupersBundle" t
      JOIN "Channel" c ON t."channelId" = c."id"
      WHERE t."createdAt" >= ${gte}
        AND t."createdAt" <= ${lte ?? new Date()}
        ${group ? sql`AND t."group" = ${group.get()}` : empty}
        ${ids ? sql`AND t."channelId" IN (${join(ids.map(e => e.get()))})` : empty}
        ${gender ? sql`AND c."gender" = ${gender.get()}` : empty}
        ${amountMicros?.gt ? sql`AND t."amountMicros" > ${amountMicros.gt.toBigInt()}` : empty}
        ${amountMicros?.gte ? sql`AND t."amountMicros" >= ${amountMicros.gte.toBigInt()}` : empty}
        ${amountMicros?.lt ? sql`AND t."amountMicros" < ${amountMicros.lt.toBigInt()}` : empty}
        ${amountMicros?.lte ? sql`AND t."amountMicros" <= ${amountMicros.lte.toBigInt()}` : empty}
    `
    return Number(result[0]?.count ?? 0)
  }

  private toDomain(row: PrismaYoutubeStreamSupersBundle) {
    return new SupersBundle({
      videoId: new VideoId(row.videoId),
      channelId: new ChannelId(row.channelId),
      amountMicros: new AmountMicros(row.amountMicros),
      count: new SupersCount(row.count),
      actualStartTime: new ActualStartTime(row.actualStartTime),
      actualEndTime: row.actualEndTime
        ? new ActualEndTime(row.actualEndTime)
        : undefined,
      group: new GroupId(row.group)
    })
  }
}
