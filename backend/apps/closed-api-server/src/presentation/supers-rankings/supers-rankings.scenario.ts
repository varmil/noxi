import { Injectable } from '@nestjs/common'
import { SupersRankingsService } from '@app/supers-rankings/supers-rankings.service'
import { Now } from '@domain/lib'
import { SupersRankings } from '@domain/supers-ranking'
import { ChannelIds } from '@domain/youtube'

@Injectable()
export class SupersRankingsScenario {
  constructor(private readonly supersRankingsService: SupersRankingsService) {}

  async createMany(args: Parameters<SupersRankingsService['createMany']>[0]) {
    return await this.supersRankingsService.createMany(args)
  }

  async getSupersRankings(
    args: Parameters<SupersRankingsService['findAggregatedOne']>[0]
  ) {
    const { period, rankingType, channelId } = args.where
    if (period.isLast24Hours()) {
      // last24Hours の場合は都度計算
      return (
        await this.supersRankingsService.calcAllUsingBundle({
          where: {
            rankingType,
            channelIds: new ChannelIds([channelId]),
            createdAt: { gte: new Now().xDaysAgo(1), lte: new Now().get() }
          }
        })
      ).findByChannelId(channelId)
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
      return await this.supersRankingsService.calcAllUsingBundle(args)
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findHistories(args)
    }
  }
}
