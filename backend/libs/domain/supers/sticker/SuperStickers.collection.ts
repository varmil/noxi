import { Collection } from '@domain/lib/Collection'
import { SuperSticker } from '@domain/supers/sticker/SuperSticker.entity'

export class SuperStickers extends Collection<SuperSticker> {
  constructor(protected readonly list: SuperSticker[]) {
    super(list)
  }
}
