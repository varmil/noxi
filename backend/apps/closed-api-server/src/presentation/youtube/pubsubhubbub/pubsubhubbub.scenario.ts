import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { DeletedEntry, UpdatedEntry } from '@domain/youtube'
import { VideoToStreamConverter } from '@domain/youtube/converter/VideoToStreamConverter'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly streamsService: StreamsService,
    private readonly videosService: VideosService
  ) {}

  async handleUpdatedCallback({ entry }: { entry: UpdatedEntry }) {
    console.log('handleUpdatedCallback', entry)

    const channel = await this.channelsService.findById(entry.channelId)
    if (!channel) {
      console.warn('handleUpdatedCallback channel not found:', entry)
      return
    }

    /** 最新の1件のみほしい */
    const video = (
      await this.videosService.findAll({
        where: { channel },
        limit: 1
      })
    ).items.first()
    if (!video) {
      console.warn('handleUpdatedCallback video not found:', entry)
      return
    }

    const stream = VideoToStreamConverter.convert(video)
    await this.streamsService.save({ data: stream })
  }

  handleDeletedCallback({ entry }: { entry: DeletedEntry }) {
    console.log('handleDeletedCallback', entry)
  }
}
