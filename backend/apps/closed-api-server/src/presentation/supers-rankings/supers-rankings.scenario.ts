import { Injectable, Logger } from '@nestjs/common'
import { SupersRankingsService } from '@app/supers-rankings/supers-rankings.service'

@Injectable()
export class SupersRankingsScenario {
  private readonly logger = new Logger(SupersRankingsScenario.name)

  constructor(private readonly supersRankingsService: SupersRankingsService) {}

  async createMany(args: Parameters<SupersRankingsService['createMany']>[0]) {
    return await this.supersRankingsService.createMany(args)
  }

  async getSupersRankings(
    args: Parameters<SupersRankingsService['findOne']>[0]
  ) {
    return await this.supersRankingsService.findOne(args)
  }

  async getSupersRankingHistories(
    args: Parameters<SupersRankingsService['findHistories']>[0]
  ) {
    return await this.supersRankingsService.findHistories(args)
  }
}
