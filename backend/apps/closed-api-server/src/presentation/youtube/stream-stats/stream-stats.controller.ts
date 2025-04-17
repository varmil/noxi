import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { GetViewerCounts } from './dto/GetViewerCounts.dto'

@Controller('youtube/stream-stats')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamStatsController {
  constructor(private readonly streamStatsService: StreamStatsService) {}

  @Get('viewer-counts')
  async GetViewerCounts(@Query() dto: GetViewerCounts) {
    return await this.streamStatsService.findAllViewerCounts({
      where: {
        videoId: dto.toVideoId()
      }
    })
  }
}
