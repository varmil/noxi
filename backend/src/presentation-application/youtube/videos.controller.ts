import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { VideosService } from '@app/youtube/videos.service'

@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getVideos(@Query('channelId') channelId: string) {
    return await this.videosService.findAll({ where: { channelId }, limit: 50 })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    throw new NotImplementedException()
  }
}
