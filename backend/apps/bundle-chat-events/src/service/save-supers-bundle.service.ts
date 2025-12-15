import { Injectable } from '@nestjs/common'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { GroupName } from '@domain/group'
import { SupersBundle, SupersCount } from '@domain/supers-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'

@Injectable()
export class SaveSupersBundleService {
  constructor(
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService,
    private readonly supersBundlesService: SupersBundlesService
  ) {}

  async execute({
    videoId,
    actualStartTime,
    actualEndTime,
    channelId,
    group
  }: {
    videoId: VideoId
    actualStartTime?: ActualStartTime
    actualEndTime?: ActualEndTime
    channelId: ChannelId
    group: GroupName
  }) {
    if (!actualStartTime) {
      throw new Error(`actualStartTime not found for ${videoId.get()}`)
    }

    const { amountMicros, count } = await this.calculateTotalInJPY(videoId)

    await this.supersBundlesService.save({
      data: new SupersBundle({
        videoId,
        channelId,
        amountMicros,
        count,
        actualStartTime,
        actualEndTime,
        group
      })
    })
  }

  private async calculateTotalInJPY(videoId: VideoId) {
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
}
