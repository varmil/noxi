import { Group } from '@domain/group'
import { SuperChat, SuperChats } from '@domain/supers'
import { VideoId } from '@domain/youtube'

export interface SuperChatRepository {
  findAll: (args: {
    where: { videoId?: VideoId; channelId?: string; group?: Group }
    orderBy: Partial<
      Record<'tier' | 'amountMicros' | 'currency' | 'createdAt', 'asc' | 'desc'>
    >[]
    limit?: number
  }) => Promise<SuperChats>

  save: (args: { data: SuperChat }) => Promise<void>
}
