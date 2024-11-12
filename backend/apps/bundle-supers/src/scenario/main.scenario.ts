import { Injectable } from '@nestjs/common'
import { QueueStatusInProgress } from '@domain'
import { PromiseService } from '@app/lib/promise-service'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'

@Injectable()
export class MainScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService,
    private readonly supersBundleQueuesService: SupersBundleQueuesService
  ) {}

  async execute(): Promise<void> {
    const tasks = await this.fetchTasks()
    console.log(
      'start',
      tasks.map(task => task.videoId.get())
    )

    const promises = tasks.map(async ({ videoId }) => {
      // タスクを処理中に更新
      // await this.supersBundleQueuesService.save({
      //   where: { videoId },
      //   data: { status: QueueStatusInProgress }
      // })

      // bundle
      await this.superChatsService.calculateTotalInJPY({
        where: { videoId }
      })

      // queueからタスクを削除
      // await this.supersBundleQueuesService.delete({
      //   where: { videoId }
      // })
    })

    await this.promiseService.allSettled(promises)
  }

  private async fetchTasks() {
    return await this.supersBundleQueuesService.findAll({
      limit: 50
    })
  }
}
