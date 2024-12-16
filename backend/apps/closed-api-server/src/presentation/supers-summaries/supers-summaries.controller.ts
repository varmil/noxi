import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersSummaries } from '@presentation/supers-summaries/dto/GetSupersSummaries.dto'
import { GetSupersSummaryHistories } from '@presentation/supers-summaries/dto/GetSupersSummaryHistories.dto'
import { SupersSummariesScenario } from '@presentation/supers-summaries/supers-summaries.scenario'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { SupersSummary } from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'

@Controller('supers-summaries')
@UseInterceptors(ClassSerializerInterceptor)
export class SupersSummariesController {
  constructor(
    private readonly supersSummariesScenario: SupersSummariesScenario,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  /** Retuen latest summaries */
  @Get()
  async getSupersSummaries(@Query() dto: GetSupersSummaries) {
    return await this.supersSummariesScenario.getSupersSummaries({
      where: {
        channelIds: dto.toChannelIds(),
        group: dto.toGroup(),
        gender: dto.toGender()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset(),
      date: dto.date
    })
  }

  /** Retuen a latest summary */
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

  /** Retuen histories of a channel */
  @Get(':id/histories')
  async getSupersSummaryHistories(
    @Param('id') id: string,
    @Query() dto: GetSupersSummaryHistories
  ) {
    const summaries = await this.supersSummariesService.findHistories({
      where: {
        channelId: new ChannelId(id),
        createdAt: { gte: dto.toCreatedAfter(), lte: dto.toCreatedBefore() }
      }
    })
    return summaries
  }
}
