import { Group } from '@domain/group'
import { SuperChat, SuperChats } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export interface SuperChatRepository {
  findAll: (args: {
    where: { videoId?: VideoId; channelId?: ChannelId; group?: Group }
    orderBy: Partial<
      Record<'tier' | 'amountMicros' | 'currency' | 'createdAt', 'asc' | 'desc'>
    >[]
    limit?: number
  }) => Promise<SuperChats>

  save: (args: { data: Omit<SuperChat, 'createdAt'> }) => Promise<void>
}
