import { Injectable } from '@nestjs/common'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { Streams } from '@domain/stream'
import { SupersCount } from '@domain/supers-bundle'
import { VideoId } from '@domain/youtube'

@Injectable()
export class MainService {
  constructor(
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService
  ) {}

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
    if (!actualStartTime || !actualEndTime) {
      throw new Error(
        `actualStartTime or actualEndTime not found for ${videoId.get()}`
      )
    }
    return {
      actualStartTime,
      actualEndTime,
      channelId,
      group
    }
  }
}
