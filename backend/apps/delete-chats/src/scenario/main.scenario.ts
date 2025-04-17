import { Injectable } from '@nestjs/common'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { ChatCountsService } from '@app/stream-stats/chat-counts.service'
import { QueueStatusInProgress } from '@domain/queue'

@Injectable()
export class MainScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly chatCountsService: ChatCountsService,
    private readonly chatDeletingQueuesService: ChatDeletingQueuesService
  ) {}

  async execute(): Promise<void> {
    const tasks = await this.fetchTasks()
    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      await this.chatDeletingQueuesService.save({
        where: { videoId },
        data: { status: QueueStatusInProgress }
      })

      // @deprecated bundle
      // await this.chatCountsService.bundle({
      //   where: { videoId }
      // })

      // TODO: removeする処理にしてjobの名前もremove-chatsにする

      // queueからタスクを削除
      await this.chatDeletingQueuesService.delete({
        where: { videoId }
      })
    })

    await this.promiseService.allSettled(promises)
  }

  private async fetchTasks() {
    return await this.chatDeletingQueuesService.findAll({
      limit: 300
    })
  }
}
