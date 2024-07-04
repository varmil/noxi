import { Inject, Injectable } from '@nestjs/common'
import { Channel } from '@domain/youtube/Channel.entity'
import { ChannelRepository } from '@domain/youtube/Channel.repository'
import { Channels } from '@domain/youtube/Channels.collection'

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelRepository')
    private readonly channelRepository: ChannelRepository
  ) {}

  async save(channel: Channel): Promise<void> {
    await this.channelRepository.save(channel)
    return
  }

  async findAll(args: { limit?: number }): Promise<Channels> {
    try {
      const channels = await this.channelRepository.findAll(args)
      return channels
    } catch (error) {
      console.error('Error fetching data from YouTube API', error)
      return new Channels([])
    }
  }
}
