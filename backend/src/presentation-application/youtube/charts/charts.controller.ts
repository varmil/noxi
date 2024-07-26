import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
import { GetChartOfChannels } from '@app/youtube/charts/dto/GetChartOfChannels.dto'
import { CountryCode } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Videos } from '@domain/youtube'

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/videos')
  async getChartOfVideos(): Promise<PaginationResponse<Videos>> {
    return await this.chartsScenario.getChartOfVideos({
      limit: 50
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/channels')
  async getChartOfChannels(@Query() dto: GetChartOfChannels) {
    return await this.chartsScenario.getChartOfChannels({
      sort: dto.toSort(),
      country: new CountryCode('TODO'),
      limit: 50
    })
  }
}
