import { Injectable } from '@nestjs/common'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { allSettled } from '@domain/lib/promise/allSettled'

@Injectable()
export class MainScenario {
  constructor(
    private readonly chatBundleQueuesService: ChatBundleQueuesService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  async execute(): Promise<void> {
    const tasks = await this.fetchTasks()
    const promises = tasks.map(async ({ status, videoId }) => {
      const chatCounts = await this.streamStatsService.findAllChatCounts({
        where: { videoId }
      })
      console.log(
        'chatCounts',
        chatCounts.take(10).map(x => x)
      )

      const x = chatCounts.bundle()
      console.log(
        'bundle',
        x.take(10).map(x => ({
          all: x.all.get(),
          member: x.member.get(),
          createdAt: x.createdAt
        }))
      )
    })

    await allSettled(promises)
  }

  private async fetchTasks() {
    return await this.chatBundleQueuesService.findAll({
      limit: 100
    })
  }
}
