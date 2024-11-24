import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { StreamStatuses, StreamStatus, Stream } from '@domain/stream'
import { ChatCount } from '@domain/stream-stats'
import { YoutubeiLiveChatInfraService } from '@infra/service/youtubei'
import { FirstContinuationFetcher } from '@infra/service/youtubei/utils/FirstContinuationFetcher'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    private readonly youtubeiLiveChatInfraService: YoutubeiLiveChatInfraService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService
  ) {}

  /**
   * * スケジュールの場合、スケジュール上の開始から取得する
   * * 終了済みの場合、終了後3分間取得
   * * メンバー限定配信は省く
   */
  async fetchLives() {
    return (
      await this.streamsService.findAll({
        where: {
          status: new StreamStatuses([
            new StreamStatus('scheduled'),
            new StreamStatus('live'),
            new StreamStatus('ended')
          ]),
          scheduledBefore: dayjs().toDate(),
          endedAfter: dayjs().subtract(3, 'minute').toDate()
        },
        limit: 1000
      })
    ).filter(stream => !stream.membersOnly)
  }

  /**
   * Youtubei から新しいメッセージを取得
   */
  async fetchNewMessages(stream: Stream) {
    const videoId = stream.videoId

    // 前回の結果を取得
    const latestChatCount = await this.streamStatsService.findLatestChatCount({
      where: { videoId }
    })

    const continuation = await this.getContinuation(stream, latestChatCount)
    if (!continuation) {
      this.logger.warn({
        message: `${videoId.get()} continuation is undefined`,
        title: stream.snippet.title,
        cause: `
        * Maybe the Live Stream is already ended.
        * Maybe the stream is member only.`
      })
      return
    }

    const { items, nextContinuation } =
      await this.youtubeiLiveChatInfraService.list({
        continuation
      })

    if (nextContinuation === undefined) {
      this.logger.log({
        message: `${stream.videoId.get()} nextContinuation is undefined`,
        title: stream.snippet.title,
        items: items.length
      })
    }

    // if (items.length === 0) {
    //   this.logger.log({
    //     message: `${stream.videoId.get()} items is empty, so save skipped`
    //   })
    //   return
    // }

    const newMessages = items.selectNewerThan(
      latestChatCount?.latestPublishedAt
    )

    // if (newMessages.isEmpty()) {
    //   this.logger.log({
    //     message: `${stream.videoId.get()} newMessages is empty, so save skipped`
    //   })
    //   return
    // }

    return {
      newMessages,
      nextContinuation
    }
  }

  /**
   * continuationが保存されていても、1分以内に更新されていない場合は更新する
   * 古すぎるとどうやらエラーも出ず、単にレスポンスが０件になってしまい気づきにくいバグになる
   */
  private async getContinuation(
    stream: Stream,
    latestChatCount: ChatCount | null
  ) {
    const {
      videoId,
      snippet: { title }
    } = stream

    const isContinuationFresh =
      latestChatCount?.createdAt &&
      dayjs().diff(latestChatCount?.createdAt, 'minute') < 1

    if (isContinuationFresh) {
      return latestChatCount.nextContinuation
    } else {
      this.logger.log({
        message: `${videoId.get()} Refresh continuation`,
        title
      })
      const options = await new FirstContinuationFetcher().fetch(videoId)
      return options?.continuation
    }
  }
}
