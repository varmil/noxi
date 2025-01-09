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
  private readonly CHUNK_SIZE = 100
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
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE

    while (true) {
      try {
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
          limit: this.CHUNK_SIZE,
          offset
        })
        if (streams.length === 0) break
        offset += this.CHUNK_SIZE

        this.logger.log(`handleScheduled/chunk: ${index(offset)}`)
        await this.handleScheduledScenario.execute({ streams })
      } catch (e) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, e)
      }
    }
  }

  /**
   * live --> ended のステートを見る
   */
  private async endLives(): Promise<void> {
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE

    while (true) {
      try {
        const streams = await this.streamsService.findAll({
          where: { status: new StreamStatus('live') },
          orderBy: [{ scheduledStartTime: 'asc' }],
          limit: this.CHUNK_SIZE,
          offset
        })
        if (streams.length === 0) break
        offset += this.CHUNK_SIZE

        this.logger.log(`endLives/chunk: ${index(offset)}`)
        await this.endLivesScenario.execute({ streams })
      } catch (e) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, e)
      }
    }
  }

  private async updateStats() {
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE

    while (true) {
      try {
        const streams = await this.streamsService.findAll({
          where: { status: new StreamStatus('live') },
          orderBy: [{ scheduledStartTime: 'asc' }],
          limit: this.CHUNK_SIZE,
          offset
        })
        if (streams.length === 0) break
        offset += this.CHUNK_SIZE

        const publicStreams = streams.filter(stream => !stream.membersOnly)
        const { items: videos } = await this.videosService.findAll({
          where: {
            ids: new VideoIds(publicStreams.map(stream => stream.videoId))
          },
          limit: publicStreams.length
        })

        this.logger.log(`updateStats/chunk: ${index(offset)}`)
        await this.mainService.updateStats(videos)
      } catch (e) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, e)
      }
    }
  }
}
