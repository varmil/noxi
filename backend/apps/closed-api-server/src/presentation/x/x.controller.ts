import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PostChannelsRankingInLast24Hours } from '@presentation/x/dto/PostChannelsRankingInLast24Hours.dto'
import { PostChannelsRankingMonthly } from '@presentation/x/dto/PostChannelsRankingMonthly.dto'
import { PostChannelsRankingWeekly } from '@presentation/x/dto/PostChannelsRankingWeekly.dto'
import { ApiKeyGuard } from '@presentation/x/guard/api-key.guard'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XMonthlyScenario } from '@presentation/x/x-monthly.scenario'
import { XWeeklyScenario } from '@presentation/x/x-weekly.scenario'

@Controller('x')
@UseGuards(ApiKeyGuard)
export class XController {
  constructor(
    private readonly xLast24HoursScenario: XLast24HoursScenario,
    private readonly xWeeklyScenario: XWeeklyScenario,
    private readonly xMonthlyScenario: XMonthlyScenario
  ) {}

  @Post('/channels/ranking/last-24-hours')
  async postChannelsRankingInLast24Hours(
    @Body() dto: PostChannelsRankingInLast24Hours
  ) {
    await this.xLast24HoursScenario.postChannelsRankingInLast24Hours({
      where: { group: dto.toGroup(), gender: dto.toGender() }
    })
  }

  @Post('/channels/ranking/weekly')
  async postChannelsRankingWeekly(@Body() dto: PostChannelsRankingWeekly) {
    await this.xWeeklyScenario.postChannelsRankingWeekly({
      where: { group: dto.toGroup(), gender: dto.toGender() }
    })
  }

  @Post('/channels/ranking/monthly')
  async postChannelsRankingMonthly(@Body() dto: PostChannelsRankingMonthly) {
    await this.xMonthlyScenario.postChannelsRankingMonthly({
      where: { group: dto.toGroup(), gender: dto.toGender() }
    })
  }
}
