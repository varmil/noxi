import { Injectable } from '@nestjs/common'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { QueueStatusInProgress } from '@domain/queue'

@Injectable()
export class MainScenario {
  constructor(
    private readonly chatBundleQueuesService: ChatBundleQueuesService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  async execute(): Promise<void> {
    const tasks = await this.fetchTasks()
    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      await this.chatBundleQueuesService.save({
        where: { videoId },
        data: { status: QueueStatusInProgress }
      })

      // bundle
      await this.streamStatsService.bundleChatCounts({
        where: { videoId }
      })

      // queueからタスクを削除
      await this.chatBundleQueuesService.delete({
        where: { videoId }
      })
    })

    await allSettled(promises)
  }

  private async fetchTasks() {
    return await this.chatBundleQueuesService.findAll({
      limit: 100
    })
  }
}
