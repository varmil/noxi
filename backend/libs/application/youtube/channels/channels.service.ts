import { Inject, Injectable } from '@nestjs/common'
import { ChannelStatisticsSummaryRepository } from '@domain/channel-statistics-summary/ChannelStatisticsSummary.repository'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { Channels } from '@domain/youtube/channel/Channels.collection'

@Injectable()
export class ChannelsService {
  constructor(
    @Inject('ChannelRepository')
    private readonly channelRepository: ChannelRepository,
    @Inject('ChannelStatisticsSummaryRepository')
    private readonly channelStatisticsSummaryRepository: ChannelStatisticsSummaryRepository
  ) {}

  async findAll(
    args: Parameters<ChannelRepository['findAll']>[0]
  ): Promise<Channels> {
    return await this.channelRepository.findAll(args)
  }

  async count(
    args: Parameters<ChannelRepository['count']>[0]
  ): Promise<number> {
    return await this.channelRepository.count(args)
  }

  async findById(
    args: Parameters<ChannelRepository['findById']>[0]
  ): Promise<Channel | null> {
    return await this.channelRepository.findById(args)
  }

  /**
   * 1. ChannelRepositoryに保存
   * 2. ChannelStatisticsSummaryRepositoryに保存
   */
  async bulkCreate(
    args: Parameters<ChannelRepository['bulkCreate']>[0]
  ): Promise<void> {
    await this.channelRepository.bulkCreate(args)
    await this.channelStatisticsSummaryRepository.bulkCreate(args)
  }

  /**
   * 1. ChannelRepositoryに保存
   * 2. ChannelStatisticsSummaryRepositoryに保存
   */
  async bulkUpdate(
    args: Parameters<ChannelRepository['bulkUpdate']>[0]
  ): Promise<void> {
    await this.channelRepository.bulkUpdate(args)
    await this.channelStatisticsSummaryRepository.bulkCreate(args)
  }
}
