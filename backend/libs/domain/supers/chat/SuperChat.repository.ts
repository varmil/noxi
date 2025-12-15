import { GroupName } from '@domain/group'
import { SuperChat, SuperChats } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export interface SuperChatRepository {
  findAll: (args: {
    where: {
      videoId?: VideoId
      channelId?: ChannelId
      userComment?: { not: null }
      group?: GroupName
      createdBefore?: Date
      createdAfter?: Date
    }
    orderBy?: Partial<
      Record<
        'commentLength' | 'amountMicros' | 'currency' | 'createdAt',
        'asc' | 'desc'
      >
    >[]
    limit?: number
  }) => Promise<SuperChats>

  count: (args: {
    where: {
      videoId?: VideoId
      channelId?: ChannelId
      userComment?: { not: null }
      group?: GroupName
      createdBefore?: Date
      createdAfter?: Date
    }
  }) => Promise<number>

  save: (args: { data: SuperChat }) => Promise<void>
}
