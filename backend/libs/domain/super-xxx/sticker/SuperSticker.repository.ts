import { SuperSticker } from '@domain/super-xxx/sticker/SuperSticker.entity'

export interface SuperStickerRepository {
  save: (args: { data: SuperSticker }) => Promise<void>
}
