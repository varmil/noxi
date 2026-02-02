import { CacheTTL } from '@nestjs/cache-manager'
import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import { GetStreamsDto } from '@presentation/youtube/stream/dto/GetStreams.dto'
import { StreamsService } from '@app/streams/streams.service'
import { VideoId } from '@domain/youtube'

@Controller('youtube/streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get()
  @CacheTTL(600 * 1000)
  async getStreams(@Query() dto: GetStreamsDto) {
    return await this.streamsService.findAll({
      where: {
        title: dto.toTitle(),
        status: dto.toStatus(),
        videoIds: dto.toVideoIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        channelId: dto.toChannelId(),
        scheduledStartTime: dto.toScheduledStartTime(),
        actualStartTime: dto.toActualStartTime(),
        actualEndTime: dto.toActualEndTime(),
        peakConcurrentViewers: dto.toPeakConcurrentViewers(),
        avgConcurrentViewers: dto.toAvgConcurrentViewers()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/count')
  @CacheTTL(3600 * 1000)
  async getStreamsCount(@Query() dto: GetStreamsDto) {
    return await this.streamsService.count({
      where: {
        title: dto.toTitle(),
        status: dto.toStatus(),
        videoIds: dto.toVideoIds(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        channelId: dto.toChannelId(),
        scheduledStartTime: dto.toScheduledStartTime(),
        actualStartTime: dto.toActualStartTime(),
        actualEndTime: dto.toActualEndTime(),
        peakConcurrentViewers: dto.toPeakConcurrentViewers(),
        avgConcurrentViewers: dto.toAvgConcurrentViewers()
      }
    })
  }

  @Get(':id')
  @CacheTTL(600 * 1000)
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
