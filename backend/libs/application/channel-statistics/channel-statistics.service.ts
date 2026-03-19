import { Inject, Injectable } from '@nestjs/common'
import { ChannelStatisticsRepository } from '@domain/channel-statistics/ChannelStatistics.repository'

@Injectable()
export class ChannelStatisticsService {
  constructor(
    @Inject('ChannelStatisticsRepository')
    private readonly channelStatisticsRepository: ChannelStatisticsRepository
  ) {}

  async findAggregatedSubscriberCounts(
    args: Parameters<
      ChannelStatisticsRepository['findAggregatedSubscriberCounts']
    >[0]
  ) {
    return await this.channelStatisticsRepository.findAggregatedSubscriberCounts(
      args
    )
  }
}
