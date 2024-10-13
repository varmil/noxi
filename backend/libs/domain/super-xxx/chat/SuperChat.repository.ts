import { SuperChat } from '@domain/super-xxx/chat/SuperChat.entity'

export interface SuperChatRepository {
  save: (args: { data: SuperChat }) => Promise<void>
}
