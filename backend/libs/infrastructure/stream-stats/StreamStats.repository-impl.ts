import { Injectable } from '@nestjs/common'
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
    const rows = await this.prismaInfraService.youtubeStreamChatCount.findMany({
      where: { videoId: videoId.get() },
      orderBy: { createdAt: 'asc' }
    })
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
