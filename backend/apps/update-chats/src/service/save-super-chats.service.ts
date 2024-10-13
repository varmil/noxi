import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'

@Injectable()
export class SaveSuperChatsService {
  private readonly logger = new Logger(SaveSuperChatsService.name)

  constructor(
    private readonly groupsService: GroupsService,
    private readonly promiseService: PromiseService,
    private readonly superChatsService: SuperChatsService
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
      if (!message.isSuperChat || !message.snippet.superChatDetails) return

      const { amountMicros, currency, amountDisplayString, tier, userComment } =
        message.snippet.superChatDetails

      this.logger.log(
        `VideoId     : ${videoId.get()},
         Group       : ${group.get()},
         SuperChat   : ${amountMicros.get()}, ${currency.get()}, ${amountDisplayString.get()}, ${tier.get()},
         UserComment : ${userComment.get()}
         Author      : ${JSON.stringify(message.authorDetails)}
        `
      )

      await this.superChatsService.save({
        data: {
          videoId,
          group,
          amountMicros,
          currency,
          amountDisplayString,
          tier,
          userComment,
          author: message.authorDetails
        }
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
