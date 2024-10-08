import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotImplementedException,
  Param,
  UseInterceptors
} from '@nestjs/common'
import { VideosScenario } from '@app/youtube/videos/scenario/videos.scenario'

/**
 *
 */
@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosScenario: VideosScenario) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getVideo(@Param('id') id: string) {
    console.log(id)
    throw new NotImplementedException()
  }
}
