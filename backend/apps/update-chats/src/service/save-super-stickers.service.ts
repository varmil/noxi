import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { SuperSticker } from '@domain/supers'
import { VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'

@Injectable()
export class SaveSuperStickersService {
  private readonly logger = new Logger(SaveSuperStickersService.name)

  constructor(
    private readonly groupsService: GroupsService,
    private readonly promiseService: PromiseService,
    private readonly superStickersService: SuperStickersService
  ) {}

  async execute({
    videoId,
    newMessages
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
  }) {
    const group = await this.groupsService.findOne({ where: { videoId } })
    if (!group) return

    const promises = newMessages.map(async message => {
      if (!message.isSuperSticker || !message.snippet.superStickerDetails)
        return

      const { amountMicros, currency, amountDisplayString } =
        message.snippet.superStickerDetails

      this.logger.log(
        `Id           : ${message.id.get()},
         VideoId      : ${videoId.get()},
         Group        : ${group.get()},
         SuperSticker : ${amountMicros.toString()}, ${currency.get()}, ${amountDisplayString.get()}
         Author       : ${JSON.stringify(message.authorDetails)}
        `
      )

      await this.superStickersService.save({
        data: new SuperSticker({
          id: message.id,
          videoId,
          group,
          amountMicros,
          currency,
          amountDisplayString,
          author: message.authorDetails,
          createdAt: message.snippet.publishedAt
        })
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
