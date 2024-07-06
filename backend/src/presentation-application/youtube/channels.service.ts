import { Inject, Injectable } from '@nestjs/common'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { ChannelBasicInfoRepository } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.repository'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelRepository')
    private readonly channelRepository: ChannelRepository,

    @Inject('ChannelBasicInfoRepository')
    private readonly channelBasicInfoRepository: ChannelBasicInfoRepository
  ) {}

  async findAll(
    args: Parameters<ChannelRepository['findAll']>[0]
  ): Promise<Channels> {
    return await this.channelRepository.findAll(args)
  }

  async save(args: Parameters<ChannelRepository['save']>[0]): Promise<void> {
    await this.channelRepository.save(args)
  }

  async findAllBasicInfos(
    args: Parameters<ChannelBasicInfoRepository['findAll']>[0]
  ): Promise<ChannelBasicInfos> {
    return await this.channelBasicInfoRepository.findAll(args)
  }

  async saveBasicInfo(
    channelBasicInfo: Parameters<ChannelBasicInfoRepository['save']>[0]
  ): Promise<void> {
    await this.channelBasicInfoRepository.save(channelBasicInfo)
  }
}
