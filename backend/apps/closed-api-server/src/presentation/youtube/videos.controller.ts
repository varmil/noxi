import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  UseInterceptors
} from '@nestjs/common'
import { VideosScenario } from 'apps/closed-api-server/src/application/youtube/videos/scenario/videos.scenario'

/**
 *
 */
@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosScenario: VideosScenario) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    throw new NotImplementedException()
  }
}
