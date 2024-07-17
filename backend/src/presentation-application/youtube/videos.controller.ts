import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { VideosScenario } from '@app/youtube/scenario/videos.scenario'
import { ChannelId, Videos } from '@domain/youtube'
import { SearchVideosInfraService } from '@infra/service/youtube-data-api'

@Controller('youtube/videos')
export class VideosController {
  constructor(
    private readonly videosScenario: VideosScenario,
    private readonly searchVideosInfraService: SearchVideosInfraService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getVideos(@Query('channelId') channelId: string): Promise<{
    nextPageToken?: string
    videos: Videos
  }> {
    return await this.videosScenario.findAll({
      channelId: new ChannelId(channelId),
      limit: 50
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    throw new NotImplementedException()
  }
}
