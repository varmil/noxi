import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { StreamsService } from '@app/youtube/streams/streams.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { StreamStatusScheduled } from '@domain/stream'
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
    console.log('handleUpdatedCallback', entry.channelId, entry.videoId)

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
      console.info(`end stream ${stream.videoId.get()}`)
      await this.streamsService.end({
        where: { videoId: stream.videoId },
        data: stream.streamTimes.end()
      })
    }
  }
}
