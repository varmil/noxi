import { Injectable } from '@nestjs/common'
import { MainService } from 'apps/bundle-supers/src/service/main.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { QueueStatusInProgress } from '@domain/queue'
import { SupersBundle } from '@domain/supers-bundle'
import { VideoIds } from '@domain/youtube'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly promiseService: PromiseService,
    private readonly streamsService: StreamsService,
    private readonly supersBundleQueuesService: SupersBundleQueuesService,
    private readonly supersBundlesService: SupersBundlesService
  ) {}

  async execute(): Promise<void> {
    await this.executeLives()
    await this.executeQueues()
  }

  private async executeLives() {
    const streams = await this.mainService.fetchLives()
    console.log(
      'executeLives()',
      streams.map(task => task.videoId.get())
    )

    const promises = streams.map(async stream => {
      const {
        videoId,
        streamTimes: { actualStartTime, actualEndTime },
        snippet: { channelId },
        group
      } = stream

      if (!actualStartTime) {
        throw new Error(`actualStartTime not found for ${videoId.get()}`)
      }

      const { amountMicros, count } =
        await this.mainService.calculateTotalInJPY(videoId)

      await this.supersBundlesService.save({
        data: new SupersBundle({
          videoId,
          channelId,
          amountMicros,
          count,
          actualStartTime,
          actualEndTime,
          group
        })
      })
    })

    await this.promiseService.allSettled(promises)
  }

  private async executeQueues() {
    const tasks = await this.mainService.fetchQueues()
    console.log(
      'executeQueues()',
      tasks.map(task => task.videoId.get())
    )

    const streams = await this.streamsService.findAll({
      where: {
        videoIds: new VideoIds(tasks.map(task => task.videoId))
      },
      limit: 100
    })

    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      await this.supersBundleQueuesService.save({
        where: { videoId },
        data: { status: QueueStatusInProgress }
      })

      const stream = this.mainService.findStream({ streams, videoId })
      if (!stream) return
      const { actualStartTime, actualEndTime, channelId, group } = stream

      const { amountMicros, count } =
        await this.mainService.calculateTotalInJPY(videoId)

      await this.supersBundlesService.save({
        data: new SupersBundle({
          videoId,
          channelId,
          amountMicros,
          count,
          actualStartTime,
          actualEndTime,
          group
        })
      })

      // queueからタスクを削除
      await this.supersBundleQueuesService.delete({
        where: { videoId }
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
