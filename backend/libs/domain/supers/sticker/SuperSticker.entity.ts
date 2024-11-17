import { Supers } from '../base/Supers'

export class SuperSticker extends Supers {
  constructor(args: ConstructorParameters<typeof Supers>[0] & {}) {
    super(args)
  }
}
