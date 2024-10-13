import { Injectable, Logger } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamsService } from '@app/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { LiveChatMessagesInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class SaveSuperStickersService {
  private readonly logger = new Logger(SaveSuperStickersService.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly liveChatMessagesInfraService: LiveChatMessagesInfraService,
    private readonly streamsService: StreamsService,
    private readonly streamStatsService: StreamStatsService,
    private readonly videosService: VideosService
  ) {}

  async execute({
    videoId,
    newMessages
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
  }) {
    // TODO:
  }
}
