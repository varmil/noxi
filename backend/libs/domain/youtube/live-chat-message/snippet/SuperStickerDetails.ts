import { SuperXXXDetails } from './SuperXXXDetails'

export class SuperStickerDetails extends SuperXXXDetails {
  public readonly stickerId: string

  constructor(
    args: ConstructorParameters<typeof SuperXXXDetails>[0] & {
      stickerId: string
    }
  ) {
    super(args)
    this.stickerId = args.stickerId
  }
}
