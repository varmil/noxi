import { Injectable } from '@nestjs/common'
import { ScheduledService } from 'apps/update-streams/src/service/scheduled.service'
import { PromiseService } from '@app/lib/promise-service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { Streams } from '@domain/stream'
import { VideoIds } from '@domain/youtube'

@Injectable()
export class HandleScheduledScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly scheduledService: ScheduledService,
    private readonly videosService: VideosService
  ) {}

  /**
   * status = scheduled のStreamを処理する
   */
  async execute({ streams }: { streams: Streams }): Promise<void> {
    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    await this.promiseService.allSettled([
      /**
       * scheduledStartTime などが変わりうるので、最新の値でDBを更新
       */
      this.scheduledService.saveLatestData({ streams, videos }),
      /**
       * scheduled --> live のステートを見る
       */
      this.scheduledService.startLives(videos),
      /**
       * scheduled --> ended のステートを見る
       */
      this.scheduledService.endLives(videos)
    ])
  }
}
