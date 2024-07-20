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
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, Videos } from '@domain/youtube'

@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosScenario: VideosScenario) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getVideos(
    @Query('channelId') channelId: string
  ): Promise<PaginationResponse<Videos>> {
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
