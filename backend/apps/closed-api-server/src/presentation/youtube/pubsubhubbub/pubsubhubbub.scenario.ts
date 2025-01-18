import { Injectable, Logger } from '@nestjs/common'
import { QueueStatusUnprocessed } from '@domain'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { StreamsService } from '@app/streams/streams.service'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { CallbackService } from '@app/youtube/pubsubhubbub/callback.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatusScheduled } from '@domain/stream'
import { DeletedEntry, UpdatedEntry } from '@domain/youtube'
import { VideoToStreamConverter } from '@domain/youtube/converter/VideoToStreamConverter'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  private readonly logger = new Logger(PubsubhubbubScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly callbackService: CallbackService,
    private readonly channelsService: ChannelsService,
    private readonly groupsService: GroupsService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService,
    private readonly chatBundleQueuesService: ChatBundleQueuesService,
    private readonly supersBundleQueuesService: SupersBundleQueuesService
  ) {}

  async handleUpdatedCallback({ entry }: { entry: UpdatedEntry }) {
    this.logger.log(`hUC: ${entry.videoId.get()}`, entry.toJSON())

    const channel = await this.channelsService.findById(entry.channelId)
    if (!channel) {
      this.logger.warn('hUC channel not found:', entry.toJSON())
      return
    }

    const group = await this.groupsService.findOne({
      where: { channelId: channel.basicInfo.id }
    })
    if (!group) {
      this.logger.warn('hUC group not found:', entry.toJSON())
      return
    }

    const video = await this.videosService.findById(entry.videoId)
    if (!video) {
      this.logger.warn('hUC video not found:', entry.toJSON())
      return
    }

    const stream = VideoToStreamConverter.convert({ group, video })
    await this.streamsService.save({ data: stream })
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
        this.chatBundleQueuesService.save({
          where: { videoId },
          data: { status: QueueStatusUnprocessed }
        }),
        this.supersBundleQueuesService.save({
          where: { videoId },
          data: { status: QueueStatusUnprocessed }
        })
      ])
    }
  }
}
