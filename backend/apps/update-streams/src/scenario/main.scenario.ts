import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { MainService } from 'apps/update-streams/src/main.service'
import { EndLivesScenario } from 'apps/update-streams/src/scenario/end-lives.scenario'
import { HandleScheduledScenario } from 'apps/update-streams/src/scenario/handle-scheduled.scenario'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatus } from '@domain/stream'
import { VideoIds } from '@domain/youtube'

@Injectable()
export class MainScenario {
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly handleScheduledScenario: HandleScheduledScenario,
    private readonly endLivesScenario: EndLivesScenario,
    private readonly mainService: MainService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  async execute(): Promise<void> {
    // Streamが始まった、終わったの更新処理
    {
      await this.promiseService.allSettled([
        this.endLives(),
        this.handleScheduled()
      ])
    }

    // Live中のStreamのStats更新
    {
      await this.updateStats()
    }
  }

  /**
   * 今から1ヶ月後までの予定に絞る
   *
   * scheduledStartTimeがNULLのまま開始されるライブがあるので
   * scheduledBeforeを「OR NULL」とする（でないと取得できない）
   */
  private async handleScheduled() {
    const streams = await this.streamsService.findAll({
      where: {
        OR: [
          {
            status: new StreamStatus('scheduled'),
            scheduledStartTime: { lte: dayjs().add(30, 'day').toDate() }
          },
          {
            status: new StreamStatus('scheduled'),
            scheduledStartTime: null
          }
        ]
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })

    if (streams.length === 0) return
    this.logger.log(`handleScheduled/streams: ${streams.length}`)

    await this.handleScheduledScenario.execute({ streams })
  }

  /**
   * live --> ended のステートを見る
   * 今から30日後までの予定に絞る
   */
  private async endLives(): Promise<void> {
    const streams = await this.streamsService.findAll({
      where: {
        status: new StreamStatus('live'),
        scheduledStartTime: { lte: dayjs().add(30, 'day').toDate() }
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit: 1000
    })

    if (streams.length === 0) return

    await this.endLivesScenario.execute({ streams })
  }

  private async updateStats() {
    const streams = (
      await this.streamsService.findAll({
        where: { status: new StreamStatus('live') },
        orderBy: [{ scheduledStartTime: 'asc' }],
        limit: 1000
      })
    ).filter(stream => !stream.membersOnly)

    this.logger.log(`live/not-members-only/streams: ${streams.length}`)
    if (streams.length === 0) return

    const { items: videos } = await this.videosService.findAll({
      where: { ids: new VideoIds(streams.map(stream => stream.videoId)) },
      limit: 1000
    })

    await this.mainService.updateStats(videos)
  }
}
