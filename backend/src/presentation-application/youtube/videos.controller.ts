import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  UseInterceptors
} from '@nestjs/common'
import { VideosScenario } from '@app/youtube/scenario/videos.scenario'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Videos } from '@domain/youtube'

/**
 *
 * # フィルター（ランキング）
 *      /youtube/videos
 *      /youtube/channels
 * # 検索（Search）
 *      /youtube/search/channels
 *      /youtube/search/videos
 *
 */
@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosScenario: VideosScenario) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async filterVideos(): Promise<PaginationResponse<Videos>> {
    return await this.videosScenario.filterVideos({
      limit: 50
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    throw new NotImplementedException()
  }
}
