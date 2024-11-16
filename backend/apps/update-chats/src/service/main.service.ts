import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { NextPageToken, VideoId } from '@domain/youtube'
import { LiveChatMessagesInfraService } from '@infra/service/youtube-data-api'
import { YoutubeiLiveChatInfraService } from '@infra/service/youtubei'
import { FirstContinuationFetcher } from '@infra/service/youtubei/utils/FirstContinuationFetcher'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    // private readonly liveChatMessagesInfraService: LiveChatMessagesInfraService,
    private readonly youtubeiLiveChatInfraService: YoutubeiLiveChatInfraService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly videosService: VideosService
  ) {}

  /**
   * とりあえずスケジュール上の開始から取得する
   * メンバー限定配信は省く
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
        orderBy: [{ scheduledStartTime: 'asc' }],
        limit: 1000
      })
    ).filter(stream => !stream.membersOnly)
  }

  /**
   * @param videoId
   * @returns
   */
  async fetchNewMessages(videoId: VideoId) {
    // setup
    const video = await this.videosService.findById(videoId)
    if (!video) return
    // const liveChatId = video.liveStreamingDetails?.activeLiveChatId
    // if (!liveChatId) return

    // 前回の結果を取得
    const latestChatCount = await this.streamStatsService.findLatestChatCount({
      where: { videoId }
    })

    let continuation: string
    if (!latestChatCount) {
      const res = await new FirstContinuationFetcher().fetch(videoId.get())
      if (!res) return
      continuation = res.continuation
    } else if (latestChatCount?.nextPageToken?.get()) {
      continuation = latestChatCount?.nextPageToken?.get()
    } else {
      this.logger.warn('no continuation, skip', video.snippet.title)
      return
    }

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
        video.snippet.title,
        newMessages.superChats.length,
        JSON.stringify(newMessages.superChats)
      )
    }

    if (video.id.get() === '5sdw7bnOi50') {
      this.logger.log(
        'CHAT',
        video.snippet.title,
        newMessages.all.get(),
        newMessages.member.get()
      )
    }

    return {
      newMessages,
      // TODO: DBにnextContinuation保存（nextPageToken消す）
      nextPageToken: nextContinuation ?? undefined
    }
  }

  // /**
  //  *
  //  * TODO: liveChatIdをStreamから取れるようにする
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
