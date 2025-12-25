import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import {
  
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersRankingHistories } from '@presentation/supers-rankings/dto/GetSupersRankingHistories.dto'
import { GetSupersRankings } from '@presentation/supers-rankings/dto/GetSupersRankings.dto'
import { SupersRankingsScenario } from '@presentation/supers-rankings/supers-rankings.scenario'

/**
 * NextのキャッシュがSWR挙動で使いにくい（古い値が見えることが多い）ので
 * 試しにバックエンドのキャッシュを使ってみる
 **/
@Controller('supers-rankings')
@UseInterceptors(CacheInterceptor)
@CacheTTL(300 * 1000)
export class SupersRankingsController {
  constructor(
    private readonly supersRankingsScenario: SupersRankingsScenario
  ) {}

  /**
   * Return a latest ranking
   * @returns SupersRanking
   * @returns NULL ランキング圏外。つまり配信していない、スパチャ額がゼロ、登録したばかりで集計前など
   *
   * IDが指定できないので便宜上複数取得のEndpointになっているが
   * 実際返却するのは「単一の」SupersRanking || NULL である
   **/
  @Get()
  async getSupersRankings(@Query() dto: GetSupersRankings) {
    return await this.supersRankingsScenario.getSupersRankings({
      where: {
        channelId: dto.toChannelId(),
        period: dto.toPeriod(),
        rankingType: dto.toRankingType()
      }
    })
  }

  /**
   * Return histories of a channel
   * @returns SupersRankings ランキング圏外の日はデータが歯抜けになるので留意
   **/
  @Get('/histories')
  async getSupersRankingHistories(@Query() dto: GetSupersRankingHistories) {
    return await this.supersRankingsScenario.getSupersRankingHistories({
      where: {
        channelIds: dto.toChannelIds(),
        period: dto.toPeriod(),
        rankingType: dto.toRankingType(),
        createdAt: { gte: dto.toCreatedAfter(), lte: dto.toCreatedBefore() }
      },
      limit: dto.toLimit()
    })
  }
}
