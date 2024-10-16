import { Group } from '@domain/group'
import { SuperSticker, SuperStickers } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export interface SuperStickerRepository {
  findAll: (args: {
    where: { videoId?: VideoId; channelId?: ChannelId; group?: Group }
    orderBy: Partial<
      Record<'tier' | 'amountMicros' | 'currency' | 'createdAt', 'asc' | 'desc'>
    >[]
    limit?: number
  }) => Promise<SuperStickers>

  save: (args: { data: SuperSticker }) => Promise<void>
}
