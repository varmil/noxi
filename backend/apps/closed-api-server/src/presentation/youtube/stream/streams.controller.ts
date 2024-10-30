import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetStreamsDto } from '@presentation/youtube/stream/dto/GetStreams.dto'
import { StreamsService } from '@app/streams/streams.service'
import { VideoId } from '@domain/youtube'

@Controller('youtube/streams')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get()
  async getStreams(@Query() dto: GetStreamsDto) {
    return await this.streamsService.findAll({
      where: {
        status: dto.toStatus(),
        videoIds: dto.toVideoIds(),
        group: dto.toGroup(),
        channelId: dto.toChannelId(),
        scheduledBefore: dto.toScheduledBefore(),
        scheduledAfter: dto.toScheduledAfter()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit()
    })
  }

  @Get(':id')
  async getStream(@Param('id') id: string) {
    return await this.streamsService.findOne({
      where: { videoId: new VideoId(id) }
    })
  }
}
