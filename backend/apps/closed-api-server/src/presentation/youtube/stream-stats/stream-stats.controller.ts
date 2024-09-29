import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { GetChatCountsDto } from './dto/GetChatCounts.dto'

@Controller('youtube/stream-stats')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamStatsController {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  @Get('chat-counts')
  async GetChatCounts(@Query() dto: GetChatCountsDto) {
    return await this.streamStatsService.findAllChatCounts({
      where: {
        videoId: dto.toVideoId()
      }
    })
  }
}
