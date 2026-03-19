import { Controller, Get, Query } from '@nestjs/common'
import { ChannelStatisticsService } from '@app/channel-statistics/channel-statistics.service'
import { CountHistories } from '@domain/channel-statistics/count-history'
import { GetAggregatedSubscriberCountsDto } from './dto/get-aggregated-subscriber-counts.dto'

@Controller('channel-statistics')
export class ChannelStatisticsController {
  constructor(
    private readonly channelStatisticsService: ChannelStatisticsService
  ) {}

  @Get('subscriber-counts')
  async getAggregatedSubscriberCounts(
    @Query() dto: GetAggregatedSubscriberCountsDto
  ): Promise<CountHistories> {
    return await this.channelStatisticsService.findAggregatedSubscriberCounts({
      where: {
        channelId: dto.toChannelId(),
        gte: dto.toGte(),
        lt: dto.toLt()
      },
      interval: dto.toInterval()
    })
  }
}
