import { Controller, Get, Query } from '@nestjs/common'
import { SubscriberRankTrendsService } from '@app/subscriber-rank-trends/subscriber-rank-trends.service'
import { SubscriberRankTrend } from '@domain/subscriber-rank-trend'
import { GetSubscriberRankTrendDto } from './dto/get-subscriber-rank-trend.dto'

@Controller('subscriber-rank-trends')
export class SubscriberRankTrendsController {
  constructor(
    private readonly subscriberRankTrendsService: SubscriberRankTrendsService
  ) {}

  @Get()
  async get(
    @Query() dto: GetSubscriberRankTrendDto
  ): Promise<SubscriberRankTrend> {
    return await this.subscriberRankTrendsService.findByChannelId({
      channelId: dto.toChannelId(),
      since: dto.toSince()
    })
  }
}
