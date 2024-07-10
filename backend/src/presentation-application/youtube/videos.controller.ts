import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  UseInterceptors
} from '@nestjs/common'
import { VideosService } from '@app/youtube/videos.service'

@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // TODO: channelId query string
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getVideos() {
    return await this.videosService.findAll({ limit: 50 })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    throw new NotImplementedException()
  }
}
