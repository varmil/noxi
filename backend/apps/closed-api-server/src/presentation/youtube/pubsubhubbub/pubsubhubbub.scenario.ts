import { Injectable, Logger } from '@nestjs/common'
import { trace } from '@opentelemetry/api'
import { ChannelCacheService } from '@presentation/youtube/pubsubhubbub/channel-cache.service'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { ChatEventsBundleQueuesService } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { CallbackService } from '@app/youtube/pubsubhubbub/callback.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { QueueStatusUnprocessed } from '@domain/queue'
import { StreamStatusScheduled } from '@domain/stream'
import { Channel, ChannelId, DeletedEntry, UpdatedEntry } from '@domain/youtube'
import { VideoToStreamConverter } from '@domain/youtube/converter/VideoToStreamConverter'

const tracer = trace.getTracer('PubsubhubbubScenario')

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  private readonly logger = new Logger(PubsubhubbubScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly callbackService: CallbackService,
    private readonly channelCacheService: ChannelCacheService,
    private readonly channelsService: ChannelsService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService,
    private readonly chatDeletingQueuesService: ChatDeletingQueuesService,
    private readonly chatEventsBundleQueuesService: ChatEventsBundleQueuesService
  ) {}

  async handleUpdatedCallback({ entry }: { entry: UpdatedEntry }) {
    return tracer.startActiveSpan(
      'PubsubhubbubScenario.handleUpdatedCallback',
      async span => {
        try {
          this.logger.log(`hUC: ${entry.videoId.get()}`, entry.toJSON())

          // 並列実行: channelとvideoを同時に取得
          const [channel, video] = await tracer.startActiveSpan(
            'fetch channel and video',
            async fetchSpan => {
              try {
                return await Promise.all([
                  this.findChannelWithCache(entry.channelId),
                  this.videosService.findById(entry.videoId)
                ])
              } finally {
                fetchSpan.end()
              }
            }
          )
          if (!channel) {
            this.logger.warn('hUC channel not found:', entry.toJSON())
            return
          }
          // ChannelからGroupを取得
          const group = channel.peakX?.group
          if (!group) {
            this.logger.warn('hUC group not found:', entry.toJSON())
            return
          }
          if (!video) {
            this.logger.warn('hUC video not found:', entry.toJSON())
            return
          }
          const stream = tracer.startActiveSpan(
            'convert video to stream',
            convertSpan => {
              try {
                return VideoToStreamConverter.convert({ group, video })
              } finally {
                convertSpan.end()
              }
            }
          )
          await tracer.startActiveSpan('save stream', async saveSpan => {
            try {
              await this.streamsService.save({ data: stream })
            } finally {
              saveSpan.end()
            }
          })
        } finally {
          span.end()
        }
      }
    )
  }

  /**
   * - ライブ後、非公開（UnArchived）or 削除された場合
   * - 普通に公開だが、ライブストリームが終了した場合
   *
   * いずれもここに来る。特に後者が謎。
   * 正常な終了処理ではないので、分岐で対応する必要がある
   * */
  async handleDeletedCallback({ entry }: { entry: DeletedEntry }) {
    this.logger.log('hDC', entry.toJSON())
    const videoId = entry.videoId
    const streamTimes = await this.callbackService.findStreamTimes(videoId)

    if (streamTimes.streamStatus.equals(StreamStatusScheduled)) {
      this.logger.log(`delete scheduled stream ${videoId.get()}`)
      await this.streamsService.delete({ where: { videoId } })
    } else {
      this.logger.log(`delete/unArchived stream ${videoId.get()}`)
      await this.promiseService.allSettled([
        this.streamsService.updateStreamTimes({
          where: { videoId },
          data: streamTimes.end()
        }),
        this.chatDeletingQueuesService.save({
          where: { videoId },
          data: { status: QueueStatusUnprocessed }
        }),
        this.chatEventsBundleQueuesService.save({
          where: { videoId },
          data: { status: QueueStatusUnprocessed }
        })
      ])
    }
  }

  /**
   * キャッシュを使用してチャンネル情報を取得
   * キャッシュにあればそれを返し、なければDBから取得してキャッシュに保存
   */
  private async findChannelWithCache(
    channelId: ChannelId
  ): Promise<Channel | null> {
    const channelIdStr = channelId.get()

    // キャッシュから取得
    const cached = this.channelCacheService.get(channelIdStr)
    if (cached) {
      return cached
    }

    // DBから取得
    const channel = await this.channelsService.findById(channelId)
    if (channel) {
      this.channelCacheService.set(channelIdStr, channel)
    }

    return channel
  }
}
