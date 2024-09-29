import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { MainService } from '../main.service'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  async execute(): Promise<void> {
    const lives = await this.fetchLives()
    const promises = lives.map(async ({ videoId }) => {
      const promises: Promise<void>[] = []
      // chat-counts
      {
        // promises.push(this.saveChatCounts(videoId))
      }

      await allSettled(promises)
    })

    await allSettled(promises)
  }

  /** とりあえず開始10分前から取得する */
  private async fetchLives() {
    return await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([
          new StreamStatus('scheduled'),
          new StreamStatus('live')
        ]),
        scheduledBefore: dayjs().add(10, 'minutes').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
  }
}
