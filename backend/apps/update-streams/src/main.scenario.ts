import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { MainService } from 'apps/update-streams/src/main.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { StreamStatus, StreamStatuses } from '@domain/stream'

@Injectable()
export class MainScenario {
  constructor(
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService
  ) {}

  async execute(): Promise<void> {
    // Streamが始まった、終わったの更新処理
    {
      await this.endScheduledLives()
      await this.startScheduledLives()
    }

    // Live中のStreamのStats更新
    {
      await this.updateStats()
    }
  }

  /**
   * scheduled --> live のステートを見る
   * 今から半年後までの予定に絞る
   */
  private async startScheduledLives() {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('scheduled')]),
        scheduledBefore: dayjs().add(180, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('updateIfLive/scheduled/streams', streams.length)
    if (streams.length === 0) return

    await this.mainService.startScheduledLives(streams)
  }

  /**
   * scheduled, live --> ended のステートを見る
   * 今から半年後までの予定に絞る
   */
  private async endScheduledLives(): Promise<void> {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([
          new StreamStatus('scheduled'),
          new StreamStatus('live')
        ]),
        scheduledBefore: dayjs().add(180, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('updateIfEnded/scheduled-live/streams', streams.length)
    if (streams.length === 0) return

    await this.mainService.endScheduledLives(streams)
  }

  private async updateStats() {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('live')])
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    console.log('updateStats/live/streams', streams.length)
    if (streams.length === 0) return

    await this.mainService.updateStats(streams)
  }
}
