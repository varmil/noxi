import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { NextContinuationsService } from '@app/next-continuation/next-continuations.service'
import { QueueStatusInProgress } from '@domain/queue'

@Injectable()
export class MainScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly nextContinuationsService: NextContinuationsService,
    private readonly chatDeletingQueuesService: ChatDeletingQueuesService
  ) {}

  /** なにかの都合で古いレコードが残っている場合があるので */
  async cleanOldRecords(): Promise<void> {
    await this.nextContinuationsService.delete({
      where: { createdAt: { lte: dayjs().subtract(7, 'days').toDate() } }
    })
  }

  async execute(): Promise<void> {
    const tasks = await this.fetchTasks()
    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      await this.chatDeletingQueuesService.save({
        where: { videoId },
        data: { status: QueueStatusInProgress }
      })

      await this.nextContinuationsService.delete({
        where: { videoId }
      })

      // queueからタスクを削除
      await this.chatDeletingQueuesService.delete({
        where: { videoId }
      })
    })
    await this.promiseService.allSettled(promises)
  }

  private async fetchTasks() {
    return await this.chatDeletingQueuesService.findAll({
      where: { createdAt: { lte: dayjs().subtract(3, 'minute').toDate() } },
      limit: 300
    })
  }
}
