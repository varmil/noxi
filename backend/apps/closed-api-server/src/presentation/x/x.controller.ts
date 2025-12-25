import {
  Body,
  
  Controller,
  Post,
  UseGuards,
  
} from '@nestjs/common'
import { PostChannelsRankingInLast24Hours } from '@presentation/x/dto/PostChannelsRankingInLast24Hours.dto'
import { ApiKeyGuard } from '@presentation/x/guard/api-key.guard'
import { XScenario } from '@presentation/x/x.scenario'

@Controller('x')
@UseGuards(ApiKeyGuard)
export class XController {
  constructor(private readonly xScenario: XScenario) {}

  @Post('/channels/ranking/last-24-hours')
  async postChannelsRankingInLast24Hours(
    @Body() dto: PostChannelsRankingInLast24Hours
  ) {
    await this.xScenario.postChannelsRankingInLast24Hours({
      where: { group: dto.toGroup(), gender: dto.toGender() }
    })
  }
}
