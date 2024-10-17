import { StickerId } from '@domain/supers'
import { SuperXXXDetails } from './SuperXXXDetails'

export class SuperStickerDetails extends SuperXXXDetails {
  public readonly stickerId: StickerId

  constructor(
    args: ConstructorParameters<typeof SuperXXXDetails>[0] & {
      stickerId: StickerId
    }
  ) {
    super(args)
    this.stickerId = args.stickerId
  }
}
