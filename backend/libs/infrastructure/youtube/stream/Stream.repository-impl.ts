import { Injectable } from '@nestjs/common'
import { StreamRepository, Streams } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { ToPrismaYoutubeStream } from '@infra/youtube/stream/ToPrismaYoutubeStream'

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

  async save({ data }: Parameters<StreamRepository['save']>[0]) {
    const stream = new ToPrismaYoutubeStream(data).translate()
    await this.prismaInfraService.youtubeStream.upsert({
      where: { videoId: data.videoId.get() },
      update: stream,
      create: stream
    })
  }
}
