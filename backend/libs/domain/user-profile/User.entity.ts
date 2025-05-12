import { Transform } from 'class-transformer'
import { Email, Name, UserId } from '@domain/user'

export class User {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: Name }) => value.get())
  public readonly name: Name

  @Transform(({ value }: { value: Email }) => value.get())
  public readonly email: Email

  constructor(args: { userId: UserId; email: Email; name: Name }) {
    this.userId = args.userId
    this.email = args.email
    this.name = args.name
  }
}
