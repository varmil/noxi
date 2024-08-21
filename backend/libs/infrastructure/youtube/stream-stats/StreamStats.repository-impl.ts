import { Injectable } from '@nestjs/common'
import {
  ChatCount,
  ChatCounts,
  Count,
  StreamStatsRepository,
  VideoId,
  ViewerCount,
  ViewerCounts
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

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

  async findAllChatCounts({
    where: { videoId }
  }: Parameters<StreamStatsRepository['findAllChatCounts']>[0]) {
    const rows = await this.prismaInfraService.youtubeStreamChatCount.findMany({
      where: { videoId: videoId.get() },
      orderBy: { createdAt: 'asc' }
    })
    return new ChatCounts(
      rows.map(
        row =>
          new ChatCount({
            videoId: new VideoId(row.videoId),
            all: new Count(row.all),
            member: new Count(row.member),
            createdAt: row.createdAt
          })
      )
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

    return new ChatCount({
      videoId: new VideoId(row.videoId),
      all: new Count(row.all),
      member: new Count(row.member),
      createdAt: row.createdAt
    })
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
      await this.prismaInfraService.$executeRaw`
        UPDATE "YoutubeStream"
        SET "maxViewerCount" = GREATEST("maxViewerCount", ${data.get()})
        WHERE "videoId" = \'${videoId}\';
      `
    }
  }

  async saveChatCount({
    where: { videoId },
    data: { all, member }
  }: Parameters<StreamStatsRepository['saveChatCount']>[0]) {
    await this.prismaInfraService.youtubeStreamChatCount.create({
      data: {
        videoId: videoId.get(),
        all: all.get(),
        member: member.get(),
        createdAt: new Date()
      }
    })
  }
}
