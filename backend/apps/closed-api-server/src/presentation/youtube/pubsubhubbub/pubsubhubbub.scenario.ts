import { Injectable } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { StreamsService } from '@app/streams/streams.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatusScheduled } from '@domain/stream'
import { DeletedEntry, UpdatedEntry } from '@domain/youtube'
import { VideoToStreamConverter } from '@domain/youtube/converter/VideoToStreamConverter'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { QueueStatusUnprocessed } from '@domain'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly channelsService: ChannelsService,
    private readonly groupsService: GroupsService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService,
    private readonly chatBundleQueuesService: ChatBundleQueuesService,
    private readonly supersBundleQueuesService: SupersBundleQueuesService
  ) {}

  async handleUpdatedCallback({ entry }: { entry: UpdatedEntry }) {
    console.log('hUC', entry.channelId, entry.videoId)

    const channel = await this.channelsService.findById(entry.channelId)
    if (!channel) {
      console.warn('hUC channel not found:', entry)
      return
    }

    const group = await this.groupsService.findOne({
      where: { channelId: channel.basicInfo.id }
    })
    if (!group) {
      console.warn('hUC group not found:', entry)
      return
    }

    const video = await this.videosService.findById(entry.videoId)
    if (!video) {
      console.warn('hUC video not found:', entry)
      return
    }

    const stream = VideoToStreamConverter.convert({ group, video })
    await this.streamsService.save({ data: stream })
  }

  /**
   * ライブ後、非公開（UnArchived）になる場合、ここに来る
   * 正常な終了処理ではないのでBundleキューなどupdate-streams終了処理はスキップされる
   * ので注意。シンプルに「削除」でも良いかもしれない．．．
   * */
  async handleDeletedCallback({ entry }: { entry: DeletedEntry }) {
    console.log('handleDeletedCallback', entry.channelId, entry.videoId)

    const stream = await this.streamsService.findOne({
      where: { videoId: entry.videoId }
    })
    if (!stream) {
      console.warn('handleDeletedCallback stream not found:', entry)
      return
    }

    if (stream.status === StreamStatusScheduled) {
      console.info(`delete scheduled stream ${stream.videoId.get()}`)
      await this.streamsService.delete({ where: { videoId: stream.videoId } })
    } else {
      // コメント参照
      console.info(`end stream ${stream.videoId.get()}`)

      await this.promiseService.allSettled([
        this.streamsService.updateStreamTimes({
          where: { videoId: stream.videoId },
          data: stream.streamTimes.end()
        }),
        this.chatBundleQueuesService.save({
          where: { videoId: stream.videoId },
          data: { status: QueueStatusUnprocessed }
        }),
        this.supersBundleQueuesService.save({
          where: { videoId: stream.videoId },
          data: { status: QueueStatusUnprocessed }
        })
      ])
    }
  }
}
