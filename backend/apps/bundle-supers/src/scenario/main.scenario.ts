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
    const tasks = await this.fetchTasks()
    console.log(
      'start',
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

      const { actualStartTime, actualEndTime, channelId, group } =
        this.mainService.findStream({ streams, videoId })

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

  private async fetchTasks() {
    return await this.supersBundleQueuesService.findAll({
      limit: 100
    })
  }
}
