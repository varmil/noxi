import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PostChannelsRankingInLast24Hours } from '@presentation/x/dto/PostChannelsRankingInLast24Hours.dto'
import { ApiKeyGuard } from '@presentation/x/guard/api-key.guard'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XSubscriberGrowthScenario } from '@presentation/x/x-subscriber-growth.scenario'
import { XSuperChatRankingScenario } from '@presentation/x/x-super-chat-ranking.scenario'
import { XConcurrentViewerRankingScenario } from '@presentation/x/x-concurrent-viewer-ranking.scenario'
import { XViewCountRankingScenario } from '@presentation/x/x-view-count-ranking.scenario'

@Controller('x')
@UseGuards(ApiKeyGuard)
export class XController {
  constructor(
    private readonly xConcurrentViewerRankingScenario: XConcurrentViewerRankingScenario,
    private readonly xLast24HoursScenario: XLast24HoursScenario,
    private readonly xSubscriberGrowthScenario: XSubscriberGrowthScenario,
    private readonly xSuperChatRankingScenario: XSuperChatRankingScenario,
    private readonly xViewCountRankingScenario: XViewCountRankingScenario
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
  async postChannelsRankingWeekly() {
    await this.xSuperChatRankingScenario.postWeeklySuperChatRanking()
  }

  @Post('/channels/ranking/monthly')
  async postChannelsRankingMonthly() {
    await this.xSuperChatRankingScenario.postMonthlySuperChatRanking()
  }

  @Post('/channels/subscriber-growth/weekly')
  async postWeeklySubscriberGrowth() {
    await this.xSubscriberGrowthScenario.postWeeklySubscriberGrowth()
  }

  @Post('/channels/subscriber-growth/monthly')
  async postMonthlySubscriberGrowth() {
    await this.xSubscriberGrowthScenario.postMonthlySubscriberGrowth()
  }

  @Post('/channels/view-count-ranking/weekly')
  async postWeeklyViewCountRanking() {
    await this.xViewCountRankingScenario.postWeeklyViewCountRanking()
  }

  @Post('/channels/view-count-ranking/monthly')
  async postMonthlyViewCountRanking() {
    await this.xViewCountRankingScenario.postMonthlyViewCountRanking()
  }

  @Post('/streams/concurrent-viewer-ranking/weekly')
  async postWeeklyConcurrentViewerRanking() {
    await this.xConcurrentViewerRankingScenario.postWeeklyConcurrentViewerRanking()
  }

  @Post('/streams/concurrent-viewer-ranking/monthly')
  async postMonthlyConcurrentViewerRanking() {
    await this.xConcurrentViewerRankingScenario.postMonthlyConcurrentViewerRanking()
  }
}
