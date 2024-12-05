import { Injectable } from '@nestjs/common'
import {
  Prisma,
  type YoutubeStreamChatCount as PrismaChatCount
} from '@prisma/client'
import {
  AvgCount,
  ChatCounts,
  Count,
  StreamStatsRepository,
  ViewerCount,
  ViewerCounts
} from '@domain/stream-stats'
import { VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { ChatCountTranslator } from '@infra/stream-stats/ChatCountTranslator'

@Injectable()
export class StreamStatsRepositoryImpl implements StreamStatsRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAllViewerCounts({
    where: { videoId }
  }: Parameters<StreamStatsRepository['findAllViewerCounts']>[0]) {
    const rows =
      await this.prismaInfraService.youtubeStreamViewerCount.findMany({
        where: { videoId: videoId.get() },
        orderBy: { createdAt: 'asc' }
      })
    return new ViewerCounts(
      rows.map(
        row =>
          new ViewerCount({
            videoId: new VideoId(row.videoId),
            count: new Count(row.count),
            createdAt: row.createdAt
          })
      )
    )
  }

  findAvgViewerCount: (args: {
    where: { videoId: VideoId }
  }) => Promise<AvgCount> = async ({ where: { videoId } }) => {
    const row =
      await this.prismaInfraService.youtubeStreamViewerCount.aggregate({
        where: { videoId: videoId.get() },
        _avg: { count: true }
      })
    return new AvgCount(row._avg.count ?? 0)
  }

  async findAllChatCounts({
    where: { videoId }
  }: Parameters<StreamStatsRepository['findAllChatCounts']>[0]) {
    const WHERE = Prisma.sql`WHERE 
      "videoId" = ${videoId.get()} AND
      "all" > 0
    `
    const GROUP_BY = Prisma.sql`GROUP BY 
      DATE_TRUNC('minute', "createdAt")
    `
    let skipInterval: Prisma.Sql = Prisma.empty

    // max 50 でinterval select
    {
      type RawCount = [{ count: bigint }]
      const [{ count }] = await this.prismaInfraService.$queryRaw<RawCount>`
        SELECT COUNT(*) as count
        FROM (
          SELECT sum("all") as all 
          FROM "YoutubeStreamChatCount"
          ${WHERE}
          ${GROUP_BY}
        )
      `
      const quotient = Math.floor(Number(count) / 50)
      if (quotient > 1) {
        console.log(`c=${count}, q=${quotient}, videoId=${videoId.get()}`)
        skipInterval = Prisma.sql`WHERE "id" % ${quotient} = 0`
      }
    }

    const rows = await this.prismaInfraService.$queryRaw<PrismaChatCount[]>`
      SELECT t.*
      FROM (
        SELECT row_number() OVER(ORDER BY "createdAt" ASC) AS "id", t2.*
        FROM (
          SELECT 
            max("videoId") as "videoId", -- 適当
            sum("all") as all, 
            sum("member") as member,
            max("latestPublishedAt") as "latestPublishedAt", -- 適当
            DATE_TRUNC('minute', max("createdAt")) as "createdAt"
          FROM "YoutubeStreamChatCount"
          ${WHERE}
          ${GROUP_BY}
          ORDER BY "createdAt" ASC
        ) t2
      ) t
      ${skipInterval}
    `
    return new ChatCounts(
      rows.map(row => new ChatCountTranslator(row).translate())
    )
  }

  async findLatestChatCount({
    where: { videoId }
  }: Parameters<StreamStatsRepository['findLatestChatCount']>[0]) {
    const row = await this.prismaInfraService.youtubeStreamChatCount.findFirst({
      where: { videoId: videoId.get() },
      orderBy: { createdAt: 'desc' }
    })
    if (!row) return null
    return new ChatCountTranslator(row).translate()
  }

  async saveViewerCount({
    where: { videoId },
    data
  }: Parameters<StreamStatsRepository['saveViewerCount']>[0]) {
    // save history
    {
      await this.prismaInfraService.youtubeStreamViewerCount.create({
        data: {
          videoId: videoId.get(),
          count: data.get(),
          createdAt: new Date()
        }
      })
    }

    // update YoutubeStream.maxViewerCount if needed
    {
      await this.prismaInfraService.$executeRawUnsafe(`
        UPDATE "YoutubeStream"
        SET "maxViewerCount" = GREATEST("maxViewerCount", ${data.get()})
        WHERE "videoId" = '${videoId.get()}';
      `)
    }
  }

  async saveChatCount({
    data: {
      videoId,
      all,
      member,
      nextContinuation,
      latestPublishedAt,
      createdAt
    }
  }: Parameters<StreamStatsRepository['saveChatCount']>[0]) {
    await this.prismaInfraService.youtubeStreamChatCount.create({
      data: {
        videoId: videoId.get(),
        all: all.get(),
        member: member.get(),
        // 終了を考えて、nullを入れる
        nextContinuation: nextContinuation?.get() ?? null,
        latestPublishedAt: latestPublishedAt.get(),
        createdAt
      }
    })
  }

  async bundleChatCounts({
    where: { videoId },
    data
  }: Parameters<StreamStatsRepository['bundleChatCounts']>[0]) {
    const prisma = this.prismaInfraService
    await prisma.$transaction([
      // delete first
      prisma.youtubeStreamChatCount.deleteMany({
        where: { videoId: videoId.get() }
      }),
      // then insert bundled data
      prisma.youtubeStreamChatCount.createMany({
        data: data.map(
          ({ videoId, all, member, latestPublishedAt, createdAt }) => ({
            videoId: videoId.get(),
            all: all.get(),
            member: member.get(),
            latestPublishedAt: latestPublishedAt.get(),
            createdAt
          })
        )
      })
    ])
  }
}
