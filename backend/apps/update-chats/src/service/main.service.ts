import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { StreamStatuses, StreamStatus, Stream } from '@domain/stream'
import { ChatCount } from '@domain/stream-stats'
import { Continuation } from '@domain/youtubei/live-chat'
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
   * * とりあえずスケジュール上の開始から取得する
   * * メンバー限定配信は省く
   */
  async fetchLives() {
    return (
      await this.streamsService.findAll({
        where: {
          status: new StreamStatuses([
            new StreamStatus('scheduled'),
            new StreamStatus('live')
          ]),
          scheduledBefore: dayjs().toDate()
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
    if (!continuation) return

    const { items, nextContinuation } =
      await this.youtubeiLiveChatInfraService.list({
        continuation
      })

    const newMessages = items.selectNewerThan(
      latestChatCount?.latestPublishedAt
    )

    if (newMessages.superChats.length > 0) {
      this.logger.log(
        'SUPER CHAT',
        stream.snippet.title,
        newMessages.superChats.length,
        JSON.stringify(newMessages.superChats)
      )
    }

    this.logger.log(
      stream.videoId.get(),
      newMessages.all.get() || '0',
      newMessages.member.get() || '0',
      nextContinuation?.get().slice(0, 10)
    )

    return {
      newMessages,
      nextContinuation
    }
  }

  private async getContinuation(
    stream: Stream,
    latestChatCount: ChatCount | null
  ) {
    const {
      videoId,
      snippet: { title }
    } = stream
    let continuation: Continuation

    // TODO: latestChatCount?.nextContinuation --> latestChatCount
    if (latestChatCount?.nextContinuation) {
      // Skip 判定
      if (!latestChatCount.nextContinuation) {
        this.logger.warn('skip', title.slice(0, 40))
        return
      } else {
        continuation = latestChatCount.nextContinuation
      }
    } else {
      const { continuation: c } = await new FirstContinuationFetcher().fetch(
        videoId
      )
      continuation = c
    }

    return continuation
  }

  // /**
  //  *
  //  * TODO: DELETE
  //  *
  //  * @param videoId
  //  * @returns
  //  */
  // async fetchNewMessages(videoId: VideoId) {
  //   // setup
  //   const video = await this.videosService.findById(videoId)
  //   if (!video) return
  //   const liveChatId = video.liveStreamingDetails?.activeLiveChatId
  //   if (!liveChatId) return

  //   // 前回の結果を取得
  //   const latestChatCount = await this.streamStatsService.findLatestChatCount({
  //     where: { videoId }
  //   })

  //   const { items, nextPageToken } =
  //     await this.liveChatMessagesInfraService.list({
  //       liveChatId,
  //       pageToken: latestChatCount?.nextPageToken
  //     })

  //   const newMessages = items.selectNewerThan(
  //     latestChatCount?.latestPublishedAt
  //   )

  //   return {
  //     newMessages,
  //     nextPageToken
  //   }
  // }
}
