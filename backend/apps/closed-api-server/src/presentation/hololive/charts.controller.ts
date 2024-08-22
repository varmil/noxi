import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChartOfChannelsDto } from '@presentation/hololive/dto/GetChartOfChannels.dto'
import { ChartsScenario } from '@app/hololive/charts/charts.scenario'

@Controller('hololive/charts')
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
  async getChartOfChannels(@Query() dto: GetChartOfChannelsDto) {
    return await this.chartsScenario.getChartOfChannels({
      sort: dto.toSort(),
      where: { country: dto.toCountryCode() },
      limit: dto.toLimit()
    })
  }
}
