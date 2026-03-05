import { Inject, Injectable } from '@nestjs/common'
import {
  ChannelViewCountRankingRepository,
  ChannelViewCountRankings
} from '@domain/channel-view-count-ranking'

@Injectable()
export class ChannelViewCountRankingsService {
  constructor(
    @Inject('ChannelViewCountRankingRepository')
    private readonly channelViewCountRankingRepository: ChannelViewCountRankingRepository
  ) {}

  async findAll(
    args: Parameters<ChannelViewCountRankingRepository['findAll']>[0]
  ): Promise<ChannelViewCountRankings> {
    return await this.channelViewCountRankingRepository.findAll(args)
  }
}
