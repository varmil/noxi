import { LiveChatMessage } from '@domain/youtube/live-chat-message'

export interface IMessageTranslator {
  translate(): LiveChatMessage | undefined
}
