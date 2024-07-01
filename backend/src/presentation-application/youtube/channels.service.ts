import {
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  UseInterceptors
} from '@nestjs/common'
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

  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    try {
      const channels = await this.channelRepository.findAll({})
      return channels
    } catch (error) {
      console.error('Error fetching data from YouTube API', error)
    }
  }
}
