import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatuses, StreamStatus } from '@domain/stream'
import { Video, VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { LiveChatMessagesInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly liveChatMessagesInfraService: LiveChatMessagesInfraService,
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
   *
   * TODO: liveChatIdをStreamから取れるようにする
   *
   * @param videoId
   * @returns
   */
  async fetchNewMessages(videoId: VideoId) {
    // setup
    const video = await this.videosService.findById(videoId)
    if (!video) return
    const liveChatId = video.liveStreamingDetails?.activeLiveChatId
    if (!liveChatId) return

    // 前回の結果を取得
    const latestChatCount = await this.streamStatsService.findLatestChatCount({
      where: { videoId }
    })

    const { items, nextPageToken } =
      await this.liveChatMessagesInfraService.list({
        liveChatId,
        pageToken: latestChatCount?.nextPageToken
      })

    const newMessages = items.selectNewerThan(
      latestChatCount?.latestPublishedAt
    )

    this.log({ newMessages, video })

    return {
      newMessages,
      nextPageToken
    }
  }

  private log = ({
    newMessages,
    video
  }: {
    newMessages: LiveChatMessages
    video: Video
  }) => {
    if (
      video.snippet.channelId === 'UC-hM6YJuNYVAmUWxeIr9FeA' ||
      video.snippet.channelId === 'UC1DCedRgGHBdm81E1llLhOQ'
    ) {
      this.logger.log(
        JSON.stringify(
          {
            first: newMessages.first()?.publishedAt.get(),
            last: newMessages.latestPublishedAt?.get()
          },
          null,
          2
        )
      )
    }

    this.logger.log(
      JSON.stringify(
        {
          title: video.snippet.title,
          videoId: video.id.get(),
          all: newMessages.all.get(),
          member: newMessages.member.get()
        },
        null,
        2
      )
    )
  }
}
