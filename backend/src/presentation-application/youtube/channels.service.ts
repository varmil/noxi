import { Inject, Injectable } from '@nestjs/common'
import { ChannelRepository } from '@domain/youtube/Channel.repository'

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

  // TODO: use class serializer
  async findAll(): Promise<string> {
    try {
      const channels = await this.channelRepository.findAll({})
      return JSON.stringify(channels)
    } catch (error) {
      console.error('Error fetching data from YouTube API', error)
    }
  }
}
