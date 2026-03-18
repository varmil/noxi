import { Inject, Injectable } from '@nestjs/common'
import {
  SubscriberRankTrend,
  SubscriberRankTrendRepository
} from '@domain/subscriber-rank-trend'

@Injectable()
export class SubscriberRankTrendsService {
  constructor(
    @Inject('SubscriberRankTrendRepository')
    private readonly repository: SubscriberRankTrendRepository
  ) {}

  async findByChannelId(
    args: Parameters<SubscriberRankTrendRepository['findByChannelId']>[0]
  ): Promise<SubscriberRankTrend> {
    return await this.repository.findByChannelId(args)
  }
}
