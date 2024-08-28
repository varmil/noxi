import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChartOfChannelsDto } from '@presentation/group/dto/GetChartOfChannels.dto'
import { ChartsScenario } from '@app/groups/charts/charts.scenario'
import { Group } from '@domain/group'

@Controller('groups/:group/charts')
export class ChartsController {
  constructor(private readonly chartsScenario: ChartsScenario) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('/videos')
  // async getChartOfVideos(): Promise<PaginationResponse<Videos>> {
  //   return await this.chartsScenario.getChartOfVideos({
  //     limit: 50
  //   })
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/channels')
  async getChartOfChannels(
    @Param('group') group: string,
    @Query() dto: GetChartOfChannelsDto
  ) {
    return await this.chartsScenario.getChartOfChannels({
      sort: dto.toSort(),
      where: { group: new Group(group), country: dto.toCountryCode() },
      limit: dto.toLimit()
    })
  }
}
