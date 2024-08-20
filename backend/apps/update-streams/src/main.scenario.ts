import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import HololiveList from '@domain/hololive/list'
import { StreamStatus } from '@domain/stream'
import { ChannelId, ChannelIds, StreamTimes, VideoIds } from '@domain/youtube'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  async execute(): Promise<void> {
    await this.checkScheduledStreams()
    return
  }

  private async checkScheduledStreams(): Promise<void> {
    // 今から半年後までの予定に絞る
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatus('scheduled'),
        scheduledBefore: dayjs().add(180, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    if (streams.length === 0) return

    console.log('streams', streams.length)

    const { items: videos } = await this.videosService.findAll({
      where: {
        ids: new VideoIds(streams.map(stream => stream.videoId))
      },
      limit: 1000
    })

    console.log('videos', videos.length)

    // select videos that's actualEndTime is not null
    const promises = videos
      .filter(video => !!video.liveStreamingDetails?.streamTimes.actualEndTime)
      .map(async video => {
        const { liveStreamingDetails } = video
        if (!liveStreamingDetails) return
        const { scheduledStartTime, actualStartTime, actualEndTime } =
          liveStreamingDetails.streamTimes

        await this.streamsService.end({
          where: { videoId: video.id },
          data: new StreamTimes({
            scheduledStartTime,
            actualStartTime,
            actualEndTime
          })
        })
      })

    await Promise.all(promises)
  }
}
