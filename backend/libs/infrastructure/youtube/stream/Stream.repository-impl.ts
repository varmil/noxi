import { Injectable } from '@nestjs/common'
import { StreamStatus, StreamStatuses } from '@domain/stream'
import { Metrics, StreamRepository, Streams, VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { StreamTranslator } from '@infra/youtube/stream/StreamTranslator'
import { UpsertYoutubeStream } from '@infra/youtube/stream/UpsertYoutubeStream'

@Injectable()
export class StreamRepositoryImpl implements StreamRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { status, group, channelId, scheduledBefore, scheduledAfter },
    orderBy,
    limit
  }: Parameters<StreamRepository['findAll']>[0]) {
    let prismaStatus: string[]
    if (status instanceof StreamStatus) {
      prismaStatus = new StreamStatuses([status]).map(s => s.get())
    } else {
      prismaStatus = status.map(s => s.get())
    }

    const rows = await this.prismaInfraService.youtubeStream.findMany({
      where: {
        status: { in: prismaStatus },
        group: group?.get(),
        channelId: channelId?.get(),
        scheduledStartTime: {
          gte: scheduledAfter,
          lte: scheduledBefore
        }
      },
      orderBy,
      take: limit
    })

    return new Streams(rows.map(row => new StreamTranslator(row).translate()))
  }

  async findOne({
    where: { videoId }
  }: Parameters<StreamRepository['findOne']>[0]) {
    const row = await this.prismaInfraService.youtubeStream.findUnique({
      where: { videoId: videoId.get() }
    })

    if (!row) return null
    return new StreamTranslator(row).translate()
  }

  async save({
    data: { group, stream }
  }: Parameters<StreamRepository['save']>[0]) {
    const toPrisma = new UpsertYoutubeStream({ group, stream })
    await this.prismaInfraService.youtubeStream.upsert({
      where: { videoId: stream.videoId.get() },
      update: toPrisma.translateToUpdate(),
      create: toPrisma.translateToCreate()
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<StreamRepository['delete']>[0]) {
    await this.prismaInfraService.youtubeStream.delete({
      where: { videoId: videoId.get() }
    })
  }

  async updateDuration({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateDuration']>[0]): Promise<void> {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: {
        duration: data.get(),
        updatedAt: new Date()
      }
    })
  }

  async updateStreamTimes({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateStreamTimes']>[0]) {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: {
        scheduledStartTime: data.scheduledStartTime,
        actualStartTime: data.actualStartTime,
        actualEndTime: data.actualEndTime,
        status: data.streamStatus.get(),
        updatedAt: new Date()
      }
    })
  }

  updateMetrics: (args: {
    where: { videoId: VideoId }
    data: Partial<ConstructorParameters<typeof Metrics>[0]>
  }) => Promise<void> = async ({ where: { videoId }, data }) => {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data
    })
  }

  async updateLikeCount({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateLikeCount']>[0]): Promise<void> {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: {
        likeCount: data,
        updatedAt: new Date()
      }
    })
  }
}
