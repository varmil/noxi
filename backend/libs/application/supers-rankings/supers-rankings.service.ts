import { Inject, Injectable } from '@nestjs/common'
import { SupersRankingRepository } from '@domain/supers-ranking'

@Injectable()
export class SupersRankingsService {
  constructor(
    @Inject('SupersRankingRepository')
    private readonly supersRankingRepository: SupersRankingRepository
  ) {}

  async createMany(args: Parameters<SupersRankingRepository['createMany']>[0]) {
    await this.supersRankingRepository.createMany(args)
  }

  async calcLast24HoursOne(
    args: Parameters<SupersRankingRepository['calcLast24HoursOne']>[0]
  ) {
    return await this.supersRankingRepository.calcLast24HoursOne(args)
  }

  async findAggregatedOne(
    args: Parameters<SupersRankingRepository['findAggregatedOne']>[0]
  ) {
    return await this.supersRankingRepository.findAggregatedOne(args)
  }

  async findHistories(
    args: Parameters<SupersRankingRepository['findHistories']>[0]
  ) {
    return await this.supersRankingRepository.findHistories(args)
  }
}
