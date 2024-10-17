import { Transform } from 'class-transformer'
import { Supers } from '../base/Supers'
import { StickerId } from './StickerId.vo'

export class SuperSticker extends Supers {
  @Transform(({ value }: { value: StickerId }) => value.get())
  public readonly stickerId: StickerId

  constructor(
    args: ConstructorParameters<typeof Supers>[0] & {
      stickerId: StickerId
    }
  ) {
    super(args)
    this.stickerId = args.stickerId
  }
}
