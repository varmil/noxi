import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  UseInterceptors
} from '@nestjs/common'
import { ChartsScenario } from '@app/youtube/charts/charts.scenario'
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
}
