import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetStreamsDto } from '@presentation/youtube/stream/dto/GetStreams.dto'
import { StreamsService } from '@app/youtube/streams/streams.service'

@Controller('youtube/streams')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get()
  async getStreams(@Query() dto: GetStreamsDto) {
    return await this.streamsService.findAll({
      where: {
        status: dto.toStatus(),
        channelId: dto.toChannelId(),
        scheduledBefore: dto.toScheduledBefore(),
        scheduledAfter: dto.toScheduledAfter()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit()
    })
  }

  //   @Get(':id')
  //   async getStream(@Param('id') id: string) {
  //     return await this.streamsService.findById(id)
  //   }
}
