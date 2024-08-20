import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import HololiveList from '@domain/hololive/list'
import { StreamStatus } from '@domain/stream'
import { ChannelId, ChannelIds } from '@domain/youtube'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly streamsService: StreamsService,
    private readonly channelsInfraService: ChannelsInfraService
  ) {}

  async execute(): Promise<void> {
    // console.log('streams', streams.length)

    return
  }

  // check scheduled streams if they are ended
  private async checkScheduledStreams(): Promise<void> {
    const streams = await this.streamsService.findAll({
      where: { status: new StreamStatus('scheduled') },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    if (streams.length === 0) return

    // select streams that's actualEndTime is not null
    const endedStreams = streams.filter(
      stream => !!stream.streamTimes.actualEndTime
    )

    return
  }
}
