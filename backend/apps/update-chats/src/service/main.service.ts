import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { CacheService } from 'apps/update-chats/src/service/cache.service'
import { NextContinuationsService } from '@app/next-continuation/next-continuations.service'
import { StreamsService } from '@app/streams/streams.service'
import { NextContinuation } from '@domain/next-continuation'
import { StreamStatus } from '@domain/stream'
import { PublishedAt, VideoId, VideoTitle } from '@domain/youtube'
import { YoutubeiLiveChatInfraService } from '@infra/service/youtubei'
import { FirstContinuationFetcher } from '@infra/service/youtubei/utils/FirstContinuationFetcher'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    private readonly cacheService: CacheService,
    private readonly youtubeiLiveChatInfraService: YoutubeiLiveChatInfraService,
    private readonly nextContinuationsService: NextContinuationsService,
    private readonly streamsService: StreamsService
  ) {}

  /**
   * * スケジュールの場合、スケジュール上の開始から取得する
   * * 終了済みの場合、終了後2分間取得
   * * メンバー限定配信は省く
   */
  async fetchLives({ limit, offset }: { limit?: number; offset?: number }) {
    return await this.streamsService.findAllLight({
      where: {
        OR: [
          {
            status: new StreamStatus('scheduled'),
            scheduledStartTime: { lte: dayjs().toDate() }
          },
          {
            status: new StreamStatus('live')
          },
          {
            status: new StreamStatus('ended'),
            actualEndTime: { gte: dayjs().subtract(2, 'minute').toDate() }
          }
        ]
      },
      orderBy: [{ scheduledStartTime: 'asc' }],
      limit,
      offset
    })
  }

  /**
   * Youtubei から新しいメッセージを取得
   * continuationがFreshなものが必要なのでメッセージがゼロ件でもINSERTする
   */
  async fetchNewMessages({
    videoId,
    title
  }: {
    videoId: VideoId
    title: VideoTitle
  }) {
    // 前回の結果を取得（メモリキャッシュ優先、なければDBから）
    let latestNextContinuation = this.cacheService.getContinuation(
      videoId.get()
    )
    if (!latestNextContinuation) {
      latestNextContinuation =
        (await this.nextContinuationsService.findLatest({
          where: { videoId }
        })) ?? undefined
    }

    const continuation = await this.getContinuation(
      { videoId, title },
      latestNextContinuation
    )
    if (!continuation) {
      this.logger.warn({
        message: `${videoId.get()} continuation is undefined`,
        title: title.get(),
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
    const newMessages = items.selectNewerThan(
      latestNextContinuation?.latestPublishedAt
    )

    // メモリキャッシュを更新（TTL 60秒、次サイクルで即座に参照可能）
    const continuationData = new NextContinuation({
      videoId,
      nextContinuation,
      latestPublishedAt:
        newMessages.latestPublishedAt ?? new PublishedAt(new Date()),
      createdAt: new Date()
    })
    this.cacheService.setContinuation(videoId.get(), continuationData)

    return {
      newMessages,
      nextContinuation: continuationData
    }
  }

  /**
   * continuationが保存されていても、1分以内に更新されていない場合は更新する
   * 古すぎるとどうやらエラーも出ず、単にレスポンスが０件になってしまい気づきにくいバグになる
   * messages がゼロ件でもINSERTするので↑のケースは無いはずだが．．．
   */
  private async getContinuation(
    { videoId, title }: { videoId: VideoId; title: VideoTitle },
    latestNextContinuation?: NextContinuation | null
  ) {
    const isContinuationFresh =
      latestNextContinuation?.createdAt &&
      dayjs().diff(latestNextContinuation?.createdAt, 'minute') < 1

    if (isContinuationFresh) {
      return latestNextContinuation.nextContinuation
    } else {
      this.logger.log({
        message: `${videoId.get()} Refresh continuation`,
        title: title.get()
      })
      const options = await new FirstContinuationFetcher().fetch(videoId)
      return options?.continuation
    }
  }
}
