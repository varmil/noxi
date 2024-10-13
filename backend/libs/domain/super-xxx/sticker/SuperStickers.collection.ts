import { Collection } from '@domain/lib/Collection'
import { SuperSticker } from '@domain/super-xxx/sticker/SuperSticker.entity'

export class SuperStickers extends Collection<SuperSticker> {
  constructor(protected readonly list: SuperSticker[]) {
    super(list)
  }
}
