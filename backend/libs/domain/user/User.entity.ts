import { Transform } from 'class-transformer'
import { Email, UserId } from '@domain/user'

export class User {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly id: UserId

  @Transform(({ value }: { value: Email }) => value.get())
  public readonly email?: Email

  constructor(args: { id: UserId; email?: Email }) {
    this.id = args.id
    this.email = args.email
  }
}
