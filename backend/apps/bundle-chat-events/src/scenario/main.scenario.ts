import { Injectable, Logger } from '@nestjs/common'
import { MainService } from 'apps/bundle-chat-events/src/service/main.service'
import { ChatEventsBundleQueuesService } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { QueueStatusInProgress } from '@domain/queue'
import { SupersBundle } from '@domain/supers-bundle'
import { VideoIds } from '@domain/youtube'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 100
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly mainService: MainService,
    private readonly promiseService: PromiseService,
    private readonly streamsService: StreamsService,
    private readonly chatEventsBundleQueuesService: ChatEventsBundleQueuesService,
    private readonly supersBundlesService: SupersBundlesService
  ) {}

  async execute(): Promise<void> {
    await this.executeLives()
    await this.executeQueues()
  }

  private async executeLives() {
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE

    while (true) {
      try {
        const streams = await this.mainService.fetchLives({
          limit: this.CHUNK_SIZE,
          offset
        })
        if (streams.length === 0) break
        offset += this.CHUNK_SIZE

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

        this.logger.log(`executeLives/chunk: ${index(offset)}`)
      } catch (e) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, e)
      }
    }
  }

  private async executeQueues() {
    const tasks = await this.mainService.fetchQueues()
    const streams = await this.streamsService.findAll({
      where: {
        videoIds: new VideoIds(tasks.map(task => task.videoId))
      },
      limit: tasks.length
    })

    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      await this.chatEventsBundleQueuesService.save({
        where: { videoId },
        data: { status: QueueStatusInProgress }
      })

      const stream = this.mainService.findStream({ streams, videoId })
      if (!stream) {
        // queueからタスクを削除
        await this.chatEventsBundleQueuesService.delete({
          where: { videoId }
        })
        return
      }

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
      await this.chatEventsBundleQueuesService.delete({
        where: { videoId }
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
