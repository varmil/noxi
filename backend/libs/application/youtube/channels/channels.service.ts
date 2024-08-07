import { Inject, Injectable } from '@nestjs/common'
import { ChannelIds } from '@domain/youtube'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { Channels } from '@domain/youtube/channel/Channels.collection'

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelRepository')
    private readonly channelRepository: ChannelRepository
  ) {}

  async findAll(
    args: Parameters<ChannelRepository['findAll']>[0]
  ): Promise<Channels> {
    return await this.channelRepository.findAll(args)
  }

  async findById(
    args: Parameters<ChannelRepository['findById']>[0]
  ): Promise<Channel | null> {
    return await this.channelRepository.findById(args)
  }

  /** @deprecated use bulkSave instead */
  async save(args: Parameters<ChannelRepository['save']>[0]): Promise<void> {
    await this.channelRepository.save(args)
  }

  /** rename to save in the future */
  async bulkSave(
    args: Parameters<ChannelRepository['bulkSave']>[0]
  ): Promise<void> {
    await this.channelRepository.bulkSave(args)
  }

  async findIds(
    args: Parameters<ChannelRepository['findIds']>[0]
  ): Promise<ChannelIds> {
    return await this.channelRepository.findIds(args)
  }
}
