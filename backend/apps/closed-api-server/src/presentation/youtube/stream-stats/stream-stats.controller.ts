import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetAllChatCountsDto } from '@presentation/youtube/stream-stats/dto/GetAllChatCounts.dto'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'
import { StreamsService } from '@app/youtube/streams/streams.service'

@Controller('youtube/stream-stats')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamStatsController {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  @Get('chat-counts')
  async GetAllChatCounts(@Query() dto: GetAllChatCountsDto) {
    return await this.streamStatsService.findAllChatCounts({
      where: {
        videoId: dto.toVideoId()
      }
    })
  }
}
