import { SuperChat } from '@domain/supers/chat/SuperChat.entity'

export interface SuperChatRepository {
  save: (args: { data: SuperChat }) => Promise<void>
}
