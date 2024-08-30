import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChartOfChannelsDto } from '@presentation/youtube/dto/GetChartOfChannels.dto'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Q, Videos } from '@domain/youtube'

/**
 *
 * # チャート（Charts）
 *      /youtube/charts/channels
 *      /youtube/charts/videos
 * # 検索（Searches）
 *      /youtube/searches/channels
 *      /youtube/searches/videos
 *
 */
@Controller('youtube/charts')
export class ChartsController {
  constructor(private readonly chartsScenario: ChartsScenario) {}

  /**
   * @deprecated
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/videos')
  async getChartOfVideos(): Promise<PaginationResponse<Videos>> {
    return await this.chartsScenario.getChartOfVideos({
      q: new Q(''),
      limit: 50
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/channels')
  async getChartOfChannels(@Query() dto: GetChartOfChannelsDto) {
    return await this.chartsScenario.getChartOfChannels({
      sort: dto.toSort(),
      where: { country: dto.toCountryCode() },
      limit: 50
    })
  }
}
