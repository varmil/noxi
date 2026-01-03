import { Inject, Injectable } from '@nestjs/common'
import {
  ChannelGrowthRankingRepository,
  ChannelGrowthRankings
} from '@domain/channel-growth-ranking'

@Injectable()
export class ChannelGrowthRankingsService {
  constructor(
    @Inject('ChannelGrowthRankingRepository')
    private readonly channelGrowthRankingRepository: ChannelGrowthRankingRepository
  ) {}

  async findAll(
    args: Parameters<ChannelGrowthRankingRepository['findAll']>[0]
  ): Promise<ChannelGrowthRankings> {
    return await this.channelGrowthRankingRepository.findAll(args)
  }
}
