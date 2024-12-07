import { Injectable } from '@nestjs/common'
import {
  AvgCount,
  Count,
  StreamStatsRepository,
  ViewerCount,
  ViewerCounts
} from '@domain/stream-stats'
import { VideoId } from '@domain/youtube'
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
}
