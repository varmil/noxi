import { z } from 'zod'
import { LiveChatMessage } from '@domain/youtube/live-chat-message'
import { addChatItemActionItemSchema } from '@infra/service/youtubei/live_chat'
import { MessageTranslatorFactory } from './translator/MessageTranslatorFactory'

export class YoutubeiLiveChatTranslator {
  constructor(
    private readonly item?: z.infer<typeof addChatItemActionItemSchema>
  ) {}

  translate(): LiveChatMessage | undefined {
    if (!this.item) return undefined
    const translator = MessageTranslatorFactory.createTranslator(this.item)
    return translator?.translate()
  }
}
