import { Inject, Injectable } from '@nestjs/common'
import { ChannelRepository } from '@domain/youtube/Channel.repository'
import { Channels } from '@domain/youtube/Channels.collection'

// TODO:
// Use DataApiInfraService directly from Scenario
// for scraping (<--> ChannelsService only treats Domain Objects)
// DataApiInfraService --> (API) -->
// ChannelsService.save() --> ChannelRepository.save() --> Firestore

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelRepository')
    private readonly channelRepository: ChannelRepository
  ) {}

  async findAll(): Promise<Channels> {
    try {
      const channels = await this.channelRepository.findAll({})
      return channels
    } catch (error) {
      console.error('Error fetching data from YouTube API', error)
    }
  }
}
