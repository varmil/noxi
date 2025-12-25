import {
  
  Controller,
  Get,
  Query,
  
} from '@nestjs/common'
import { GetMembershipSummaries } from '@presentation/membership-summaries/dto/GetMembershipSummaries.dto'
import { GetMembershipSummary } from '@presentation/membership-summaries/dto/GetMembershipSummary.dto'
import { GetMembershipSummaryHistories } from '@presentation/membership-summaries/dto/GetMembershipSummaryHistories.dto'
import { MembershipSummariesScenario } from '@presentation/membership-summaries/membership-summaries.scenario'
import { MembershipSummariesService } from '@app/membership-summaries/membership-summaries.service'
import { MembershipSummary } from '@domain/membership-summary'

@Controller('membership-summaries')
export class MembershipSummariesController {
  constructor(
    private readonly membershipSummariesScenario: MembershipSummariesScenario,
    private readonly membershipSummariesService: MembershipSummariesService
  ) {}

  /** Return latest summaries */
  @Get()
  async getMembershipSummaries(@Query() dto: GetMembershipSummaries) {
    return await this.membershipSummariesScenario.getMembershipSummaries({
      where: {
        period: dto.toPeriod(),
        channelIds: dto.toChannelIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        count: dto.toCount()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/count')
  async getMembershipSummariesCount(@Query() dto: GetMembershipSummaries) {
    return await this.membershipSummariesScenario.countMembershipSummaries({
      where: {
        period: dto.toPeriod(),
        channelIds: dto.toChannelIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        count: dto.toCount()
      }
    })
  }

  /**
   * Return a latest summary
   * channelId + period = Unique
   */
  @Get('summary')
  async getMembershipSummary(@Query() dto: GetMembershipSummary) {
    const summary = await this.membershipSummariesService.findOne({
      where: { channelId: dto.toChannelId(), period: dto.toPeriod() }
    })
    // データがない＝今日追加されたChannel
    // なので、404ではなくゼロを意味するEntityを返却する
    if (!summary) {
      return MembershipSummary.zero(dto.toChannelId(), dto.toPeriod())
    }
    return summary
  }

  /**
   * Return histories of a channel
   * channelId + period = Unique
   */
  @Get('/histories')
  async getMembershipSummaryHistories(
    @Query() dto: GetMembershipSummaryHistories
  ) {
    const summaries = await this.membershipSummariesService.findHistories({
      where: {
        channelId: dto.toChannelId(),
        period: dto.toPeriod(),
        createdAt: { gte: dto.toCreatedAfter(), lte: dto.toCreatedBefore() }
      },
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
    return summaries
  }
}
