import { Injectable, Logger } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { GroupId } from '@domain/group'
import { SuperChat } from '@domain/supers'
import { VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'

@Injectable()
export class SaveSuperChatsService {
  private readonly logger = new Logger(SaveSuperChatsService.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly superChatsService: SuperChatsService
  ) {}

  async execute({
    videoId,
    newMessages,
    group
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
    group: GroupId
  }) {
    const promises = newMessages.map(async message => {
      if (!message.isSuperChat || !message.snippet.superChatDetails) return

      const { amountMicros, currency, amountDisplayString, userComment } =
        message.snippet.superChatDetails

      this.logger.log({
        id: message.id.get(),
        videoId: videoId.get(),
        group: group.get(),
        superChat: {
          amount: amountMicros.toString(),
          currency: currency.get(),
          displayString: amountDisplayString.get()
        },
        comment: userComment.get(),
        author: message.authorDetails.displayName.get()
      })

      await this.superChatsService.save({
        data: new SuperChat({
          id: message.id,
          videoId,
          group,
          amountMicros,
          currency,
          amountDisplayString,
          userComment,
          author: message.authorDetails,
          createdAt: message.snippet.publishedAt
        })
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
