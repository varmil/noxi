import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersRankingHistories } from '@presentation/supers-rankings/dto/GetSupersRankingHistories.dto'
import { GetSupersRankings } from '@presentation/supers-rankings/dto/GetSupersRankings.dto'
import { SupersRankingsScenario } from '@presentation/supers-rankings/supers-rankings.scenario'

@Controller('supers-rankings')
@UseInterceptors(ClassSerializerInterceptor)
export class SupersRankingsController {
  constructor(
    private readonly supersRankingsScenario: SupersRankingsScenario
  ) {}

  /**
   * Retuen a latest ranking
   * @returns 「単一の」SupersRanking
   *
   * IDが指定できないので便宜上複数取得のEndpointになっているが
   * 実際返却するのは「単一の」SupersRankingなので注意
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

  /** Retuen histories of a channel */
  @Get('/histories')
  async getSupersRankingHistories(@Query() dto: GetSupersRankingHistories) {
    return await this.supersRankingsScenario.getSupersRankingHistories({
      where: {
        channelId: dto.toChannelId(),
        period: dto.toPeriod(),
        rankingType: dto.toRankingType(),
        createdAt: { gte: dto.toCreatedAfter(), lte: dto.toCreatedBefore() }
      }
    })
  }
}
