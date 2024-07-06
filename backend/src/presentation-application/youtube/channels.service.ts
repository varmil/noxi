import { Inject, Injectable } from '@nestjs/common'
import { ChannelBasicInfoRepository } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.repository'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelBasicInfoRepository')
    private readonly channelBasicInfoRepository: ChannelBasicInfoRepository
  ) {}

  async findAll(
    args: Parameters<ChannelBasicInfoRepository['findAll']>[0]
  ): Promise<ChannelBasicInfos> {
    return await this.channelBasicInfoRepository.findAll(args)
  }

  // async save(
  //   args: Parameters<ChannelBasicInfoRepository['findAll']>[0]
  // ): Promise<ChannelBasicInfos> {
  //   throw new NotImplementedException()
  // }

  async findAllBasicInfos(
    args: Parameters<ChannelBasicInfoRepository['findAll']>[0]
  ): Promise<ChannelBasicInfos> {
    return await this.channelBasicInfoRepository.findAll(args)
  }

  async saveBasicInfo(
    channelBasicInfo: Parameters<ChannelBasicInfoRepository['save']>[0]
  ): Promise<void> {
    await this.channelBasicInfoRepository.save(channelBasicInfo)
    return
  }
}
