import { Inject, Injectable } from '@nestjs/common'
import {
  ChannelSupersRankingRepository,
  ChannelSupersRankings
} from '@domain/channel-supers-ranking'

@Injectable()
export class ChannelSupersRankingsService {
  constructor(
    @Inject('ChannelSupersRankingRepository')
    private readonly channelSupersRankingRepository: ChannelSupersRankingRepository
  ) {}

  async findAll(
    args: Parameters<ChannelSupersRankingRepository['findAll']>[0]
  ): Promise<ChannelSupersRankings> {
    return await this.channelSupersRankingRepository.findAll(args)
  }
}
