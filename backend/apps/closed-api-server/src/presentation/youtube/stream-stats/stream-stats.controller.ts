import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { GetChatCountsDto } from './dto/GetChatCounts.dto'
import { GetViewerCounts } from './dto/GetViewerCounts.dto'

@Controller('youtube/stream-stats')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamStatsController {
  constructor(private readonly streamStatsService: StreamStatsService) {}

  @Get('chat-counts')
  async GetChatCounts(@Query() dto: GetChatCountsDto) {
    return await this.streamStatsService.findAllChatCounts({
      where: {
        videoId: dto.toVideoId()
      }
    })
  }

  @Get('viewer-counts')
  async GetViewerCounts(@Query() dto: GetViewerCounts) {
    return await this.streamStatsService.findAllViewerCounts({
      where: {
        videoId: dto.toVideoId()
      }
    })
  }
}
