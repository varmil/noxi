import { Transform } from 'class-transformer'
import { UserId } from '@domain/user'
import { Description, Image, Name } from '@domain/user-profile'

export class UserProfile {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: Name }) => value.get())
  public readonly name: Name

  @Transform(({ value }: { value: Image }) => value.get())
  public readonly image: Image

  @Transform(({ value }: { value: Description }) => value.get())
  public readonly description: Description

  constructor(args: {
    userId: UserId
    name: Name
    image: Image
    description: Description
  }) {
    this.userId = args.userId
    this.name = args.name
    this.image = args.image
    this.description = args.description
  }
}
