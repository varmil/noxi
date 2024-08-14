import { Injectable } from '@nestjs/common'
import { StreamRepository, Streams } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { StreamTranslator } from '@infra/youtube/stream/StreamTranslator'
import { UpsertYoutubeStream } from '@infra/youtube/stream/UpsertYoutubeStream'

@Injectable()
export class StreamRepositoryImpl implements StreamRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { channelId, status },
    limit
  }: Parameters<StreamRepository['findAll']>[0]) {
    await this.prismaInfraService.youtubeStream.findMany({
      where: { channelId: channelId?.get(), status: status.get() },
      take: limit
    })

    return new Streams([])
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

  async save({ data }: Parameters<StreamRepository['save']>[0]) {
    const toPrisma = new UpsertYoutubeStream(data)
    await this.prismaInfraService.youtubeStream.upsert({
      where: { videoId: data.videoId.get() },
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
        status: data.streamStatus.get()
      }
    })
  }
}
