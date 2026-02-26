import { Transform } from 'class-transformer'
import { Amount } from '@domain/hyper-chat-order'

export class AnonymousPoster {
  @Transform(({ value }: { value: Amount }) => value.get())
  public readonly totalAmount: Amount

  constructor(args: { totalAmount: Amount }) {
    this.totalAmount = args.totalAmount
  }
}
