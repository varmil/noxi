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
    await this.updateIfEnded()
    await this.updateIfLive()
  }

  /**
   * scheduled --> live のステートを見る
   * 今から半年後までの予定に絞る
   */
  private async updateIfLive() {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('scheduled')]),
        scheduledBefore: dayjs().add(180, 'day').toDate()
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })
    if (streams.length === 0) return
    console.log('updateIfLive/scheduled/streams', streams.length)

    await this.mainService.updateStreamsIfLive(streams)
  }

  /**
   * scheduled, live --> ended のステートを見る
   * 今から半年後までの予定に絞る
   */
  private async updateIfEnded(): Promise<void> {
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
    if (streams.length === 0) return
    console.log('updateIfEnded/scheduled-live/streams', streams.length)

    await this.mainService.updateStreamsIfEnded(streams)
  }
}
