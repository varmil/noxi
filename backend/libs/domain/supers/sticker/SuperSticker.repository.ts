import { SuperSticker } from '@domain/supers/sticker/SuperSticker.entity'

export interface SuperStickerRepository {
  save: (args: { data: SuperSticker }) => Promise<void>
}
