import { Transform } from 'class-transformer'
import { Amount } from '@domain/hyper-chat-order'
import { UserId } from '@domain/user'
import { Image, Name, Username } from '@domain/user-profile'

export class Poster {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: Amount }) => value.get())
  public readonly totalAmount: Amount

  @Transform(({ value }: { value: Name }) => value.get())
  public readonly name: Name

  @Transform(({ value }: { value: Image }) => value.get())
  public readonly image: Image

  @Transform(({ value }: { value: Username }) => value.get())
  public readonly username: Username

  constructor(args: {
    userId: UserId
    totalAmount: Amount
    name: Name
    image: Image
    username: Username
  }) {
    this.userId = args.userId
    this.totalAmount = args.totalAmount
    this.name = args.name
    this.image = args.image
    this.username = args.username
  }
}
