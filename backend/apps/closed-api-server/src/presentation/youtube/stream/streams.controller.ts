import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
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
        scheduledAfter: dto.toScheduledAfter(),
        endedBefore: dto.toEndedBefore(),
        endedAfter: dto.toEndedAfter()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get(':id')
  async getStream(@Param('id') id: string) {
    const stream = await this.streamsService.findOne({
      where: { videoId: new VideoId(id) }
    })
    if (!stream) {
      throw new NotFoundException(`stream not found for ${id}`)
    }
    return stream
  }
}
