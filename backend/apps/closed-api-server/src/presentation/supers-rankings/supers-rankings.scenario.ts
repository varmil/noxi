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
    args: Parameters<SupersRankingsService['findAggregatedOne']>[0]
  ) {
    if (args.where.period.isLast24Hours()) {
      // last24Hours の場合は都度計算
      return await this.supersRankingsService.calcLast24HoursOne(args)
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findAggregatedOne(args)
    }
  }

  async getSupersRankingHistories(
    args: Parameters<SupersRankingsService['findHistories']>[0]
  ) {
    if (args.where.period.isLast24Hours()) {
      // last24Hours の場合は都度計算
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findHistories(args)
    }
  }
}
