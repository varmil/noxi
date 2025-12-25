import {
  
  Controller,
  Get,
  NotImplementedException,
  Param,
  
} from '@nestjs/common'
import { VideosScenario } from '@app/youtube/videos/scenario/videos.scenario'

/**
 *
 */
@Controller('youtube/videos')
export class VideosController {
  constructor(private readonly videosScenario: VideosScenario) {}

  @Get(':id')
  getVideo(@Param('id') id: string) {
    console.log(id)
    throw new NotImplementedException()
  }
}
