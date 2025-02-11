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

  async findOne(args: Parameters<SupersRankingRepository['findOne']>[0]) {
    return await this.supersRankingRepository.findOne(args)
  }

  async findHistories(
    args: Parameters<SupersRankingRepository['findHistories']>[0]
  ) {
    return await this.supersRankingRepository.findHistories(args)
  }
}
