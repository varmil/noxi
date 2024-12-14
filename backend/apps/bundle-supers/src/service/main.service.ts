import { Injectable, Logger } from '@nestjs/common'
import { StreamsService } from '@app/streams/streams.service'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { Streams, StreamStatus, StreamStatuses } from '@domain/stream'
import { SupersCount } from '@domain/supers-bundle'
import { VideoId } from '@domain/youtube'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    private readonly streamsService: StreamsService,
    private readonly supersBundleQueuesService: SupersBundleQueuesService,
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService
  ) {}

  /** live中（リアルタイム） */
  async fetchLives() {
    return await this.streamsService.findAll({
      where: {
        status: new StreamStatuses([new StreamStatus('live')])
      },
      limit: 1000
    })
  }

  /**  queue */
  async fetchQueues() {
    return await this.supersBundleQueuesService.findAll({
      limit: 100
    })
  }

  async calculateTotalInJPY(videoId: VideoId) {
    const { amountMicros: chatTotalInJPY, count: chatCount } =
      await this.superChatsService.calculateTotalInJPY({
        where: { videoId }
      })
    const { amountMicros: stickerTotalInJPY, count: stickerCount } =
      await this.superStickersService.calculateTotalInJPY({
        where: { videoId }
      })

    console.log(
      `[SuperChat for ${videoId.get()}] Micro =`,
      chatTotalInJPY.round().toString(),
      'JPY =',
      chatTotalInJPY.toAmount().round().toFixed()
    )

    console.log(
      `[SuperSticker for ${videoId.get()}] Micro =`,
      stickerTotalInJPY.round().toString(),
      'JPY =',
      stickerTotalInJPY.toAmount().round().toFixed()
    )
    return {
      amountMicros: chatTotalInJPY.plus(stickerTotalInJPY).round(),
      count: new SupersCount(chatCount + stickerCount)
    }
  }

  findStream({ streams, videoId }: { streams: Streams; videoId: VideoId }) {
    const stream = streams.find(s => s.videoId.equals(videoId))
    if (!stream) {
      throw new Error(`stream not found for ${videoId.get()}`)
    }
    const {
      streamTimes: { actualStartTime, actualEndTime },
      snippet: { channelId },
      group
    } = stream
    // スケジュールされたまま配信せずendedになるとここに入ってくるが、
    // 配信してないのでスパチャも存在しないとみなし、レコード作らない
    if (!actualStartTime) {
      this.logger.log(`actualStartTime not found for ${videoId.get()}, skip`)
      return undefined
    }
    return {
      actualStartTime,
      actualEndTime,
      channelId,
      group
    }
  }
}
