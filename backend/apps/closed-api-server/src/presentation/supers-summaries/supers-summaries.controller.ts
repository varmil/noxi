import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import {
  
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersMonthlySummaries } from '@presentation/supers-summaries/dto/GetSupersMonthlySummaries.dto'
import { GetSupersSummaries } from '@presentation/supers-summaries/dto/GetSupersSummaries.dto'
import { GetSupersSummaryHistories } from '@presentation/supers-summaries/dto/GetSupersSummaryHistories.dto'
import { SupersSummariesScenario } from '@presentation/supers-summaries/supers-summaries.scenario'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { SupersSummary } from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'

@Controller('supers-summaries')
export class SupersSummariesController {
  constructor(
    private readonly supersSummariesScenario: SupersSummariesScenario,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  /** Return latest summaries */
  @Get()
  async getSupersSummaries(@Query() dto: GetSupersSummaries) {
    return await this.supersSummariesScenario.getSupersSummaries({
      where: {
        channelIds: dto.toChannelIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        amountMicros: dto.amountMicros // parse in scenario
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset(),
      date: dto.date
    })
  }

  @Get('/count')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(12 * 3600 * 1000)
  async getSupersSummariesCount(@Query() dto: GetSupersSummaries) {
    return await this.supersSummariesScenario.countSupersSummaries({
      where: {
        channelIds: dto.toChannelIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        amountMicros: dto.amountMicros // parse in scenario
      },
      orderBy: dto.toOrderBy(),
      date: dto.date
    })
  }

  /** Return monthly summaries of a channel */
  @Get('/monthly')
  async getSupersMonthlySummaries(@Query() dto: GetSupersMonthlySummaries) {
    const summaries = await this.supersSummariesService.findAllMonthly({
      where: { channelId: dto.toChannelId() },
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
    return summaries
  }

  /** Return a latest summary */
  @Get(':id')
  async getSupersSummary(@Param('id') id: string) {
    const summary = await this.supersSummariesService.findOne({
      where: { channelId: new ChannelId(id) }
    })
    // データがない＝今日追加されたChannel
    // なので、404ではなくゼロを意味するEntityを返却する
    if (!summary) {
      return SupersSummary.zero(new ChannelId(id))
    }
    return summary
  }

  /** Return histories of a channel */
  @Get(':id/histories')
  async getSupersSummaryHistories(
    @Param('id') id: string,
    @Query() dto: GetSupersSummaryHistories
  ) {
    const summaries = await this.supersSummariesService.findHistories({
      where: {
        channelId: new ChannelId(id),
        createdAt: { gte: dto.toCreatedAfter(), lte: dto.toCreatedBefore() }
      },
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
    return summaries
  }
}
