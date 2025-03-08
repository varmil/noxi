import { z } from 'zod'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat'
import { IMessageTranslator } from './IMessageTranslator'
import { PaidMessageTranslator } from './PaidMessageTranslator'
import { PaidStickerTranslator } from './PaidStickerTranslator'
import { TextMessageTranslator } from './TextMessageTranslator'

export class MessageTranslatorFactory {
  static createTranslator(
    item: z.infer<typeof addChatItemActionItemSchema>
  ): IMessageTranslator | undefined {
    const {
      liveChatTextMessageRenderer,
      liveChatPaidMessageRenderer,
      liveChatPaidStickerRenderer
    } = item

    if (liveChatTextMessageRenderer) {
      return new TextMessageTranslator(liveChatTextMessageRenderer)
    } else if (liveChatPaidMessageRenderer) {
      return new PaidMessageTranslator(liveChatPaidMessageRenderer)
    } else if (liveChatPaidStickerRenderer) {
      return new PaidStickerTranslator(liveChatPaidStickerRenderer)
    }

    return undefined
  }
}
