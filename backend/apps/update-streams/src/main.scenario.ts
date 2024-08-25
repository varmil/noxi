import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { MainService } from 'apps/update-streams/src/main.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatus, StreamStatuses } from '@domain/stream'
import { VideoIds } from '@domain/youtube'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  async execute(): Promise<void> {
    // Streamが始まった、終わったの更新処理
    {
      await this.endLives()
      await this.handleScheduled()
    }

    // Live中のStreamのStats更新
    {
      await this.updateStats()
    }
  }

  /**
   * 今から3ヶ月後までの予定に絞る
   */
  private async handleScheduled() {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('scheduled')]),
        scheduledBefore: dayjs().add(90, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('handleScheduled/streams', streams.length)
    if (streams.length === 0) return

    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    await Promise.all([
      /**
       * scheduledStartTime などが変わりうるので、最新の値でDBを更新
       */
      this.mainService.saveLatestScheduledData({ streams, videos }),
      /**
       * scheduled --> live のステートを見る
       */
      this.mainService.startScheduledLives(videos)
    ])
  }

  /**
   * live --> ended のステートを見る
   * 今から90日後までの予定に絞る
   */
  private async endLives(): Promise<void> {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('live')]),
        scheduledBefore: dayjs().add(90, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('endLives/streams', streams.length)
    if (streams.length === 0) return

    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    await this.mainService.endScheduledLives(videos)
  }

  private async updateStats() {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('live')])
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('updateStats/live/streams', streams.length)
    if (streams.length === 0) return

    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    await this.mainService.updateStats(videos)
  }
}
