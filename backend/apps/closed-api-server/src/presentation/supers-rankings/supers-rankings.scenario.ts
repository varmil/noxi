import { Injectable, Logger } from '@nestjs/common'
import { SupersRankingsService } from '@app/supers-rankings/supers-rankings.service'
import { Now } from '@domain/lib'
import { SupersRankings } from '@domain/supers-ranking'

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
      return await this.supersRankingsService.calcOneUsingBundle({
        where: {
          ...args.where,
          createdAt: { gte: new Now().xDaysAgo(1), lte: new Now().get() }
        }
      })
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findAggregatedOne(args)
    }
  }

  async getSupersRankingHistories(
    args: Parameters<SupersRankingsService['findHistories']>[0]
  ): Promise<SupersRankings> {
    if (args.where.period.isLast24Hours()) {
      // last24Hours の場合は都度計算
      return new SupersRankings(
        [await this.supersRankingsService.calcOneUsingBundle(args)].filter(
          e => !!e
        )
      )
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findHistories(args)
    }
  }
}
