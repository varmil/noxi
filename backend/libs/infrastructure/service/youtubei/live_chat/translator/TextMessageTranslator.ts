import { z } from 'zod'
import { PublishedAt } from '@domain/youtube'
import {
  LiveChatMessage,
  LiveChatMessageId,
  Snippet,
  Type
} from '@domain/youtube/live-chat-message'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat'
import { BaseTranslator } from './BaseTranslator'
import { IMessageTranslator } from './IMessageTranslator'

export class TextMessageTranslator
  extends BaseTranslator
  implements IMessageTranslator
{
  constructor(
    private readonly renderer: z.infer<
      typeof addChatItemActionItemSchema
    >['liveChatTextMessageRenderer']
  ) {
    super()
  }

  translate(): LiveChatMessage | undefined {
    if (!this.renderer) return undefined

    const {
      id,
      authorName,
      authorPhoto,
      authorExternalChannelId,
      timestampUsec,
      authorBadges
    } = this.renderer

    const type = new Type('textMessageEvent')

    return new LiveChatMessage({
      id: new LiveChatMessageId(id),
      snippet: new Snippet({
        type: type,
        publishedAt: new PublishedAt(new Date(Number(timestampUsec) / 1000)),
        superChatDetails: undefined,
        superStickerDetails: undefined
      }),
      authorDetails: this.createAuthorDetails(
        authorExternalChannelId,
        authorName,
        authorPhoto,
        authorBadges
      )
    })
  }
}
