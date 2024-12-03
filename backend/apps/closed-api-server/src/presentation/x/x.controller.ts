import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiKeyGuard } from '@presentation/x/guard/api-key.guard'
import { XScenario } from '@presentation/x/x.scenario'

@Controller('x')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(ApiKeyGuard)
export class XController {
  constructor(private readonly xScenario: XScenario) {}

  @Post('/channels/ranking/last-24-hours')
  async postChannelsRankingInLast24Hours() {
    await this.xScenario.postChannelsRankingInLast24Hours()
  }
}
