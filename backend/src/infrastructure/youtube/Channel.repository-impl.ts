import { Injectable, NotImplementedException } from '@nestjs/common'
import { ChannelRepository } from '@domain/youtube/Channel.repository'
import { Channels } from '@domain/youtube/Channels.collection'
import { YoutubeDataApiInfrastructureService } from '@infra/service/youtube-data-api/youtube-data-api.infrastructure.service'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly PAGE_SIZE = 10

  constructor(
    private youtubeDataApiInfrastructureService: YoutubeDataApiInfrastructureService
  ) {}

  // TODO: fetch from Firestore, not from Data API
  async findAll({ limit = this.PAGE_SIZE }: { limit?: number }) {
    const channels =
      await this.youtubeDataApiInfrastructureService.getChannels(limit)
    return new Channels(channels)
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
