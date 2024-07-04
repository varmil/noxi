import { Injectable, NotImplementedException } from '@nestjs/common'
import { ChannelRepository } from '@domain/youtube/Channel.repository'
import { Channels } from '@domain/youtube/Channels.collection'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  constructor(
    private youtubeDataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  // TODO: fetch from Firestore, not from Data API
  async findAll({ limit = 50 }: { limit?: number }) {
    const channels =
      await this.youtubeDataApiSearchInfraService.getChannels(limit)
    return new Channels(channels)
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
