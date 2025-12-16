import { GroupId } from '@domain/group'
import { SuperSticker, SuperStickers } from '@domain/supers'
import { ChannelId, VideoId } from '@domain/youtube'

export interface SuperStickerRepository {
  findAll: (args: {
    where: { videoId?: VideoId; channelId?: ChannelId; group?: GroupId }
    orderBy?: Partial<
      Record<
        'commentLength' | 'amountMicros' | 'currency' | 'createdAt',
        'asc' | 'desc'
      >
    >[]
    limit?: number
  }) => Promise<SuperStickers>

  save: (args: { data: SuperSticker }) => Promise<void>
}
