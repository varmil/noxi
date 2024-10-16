import { SuperXXX } from '../base/SuperXXX'
import { StickerId } from './StickerId.vo'

export class SuperSticker extends SuperXXX {
  public readonly stickerId: StickerId

  constructor(
    args: ConstructorParameters<typeof SuperXXX>[0] & {
      stickerId: StickerId
    }
  ) {
    super(args)
    this.stickerId = args.stickerId
  }
}
