import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersSummaries } from '@presentation/supers-summaries/dto/GetSupersSummaries.dto'
import { SupersSummariesScenario } from '@presentation/supers-summaries/supers-summaries.scenario'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
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
    if (!summary) {
      throw new NotFoundException(`summary not found for ${id}`)
    }
    return summary
  }
}
