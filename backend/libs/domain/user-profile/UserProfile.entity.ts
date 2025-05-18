import { Transform } from 'class-transformer'
import { UserId } from '@domain/user'
import { Description, Image, Name, Username } from '@domain/user-profile'

export class UserProfile {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: Name }) => value.get())
  public readonly name: Name

  @Transform(({ value }: { value: Username }) => value.get())
  public readonly username: Username

  @Transform(({ value }: { value: Image }) => value.get())
  public readonly image: Image

  @Transform(({ value }: { value: Description }) => value.get())
  public readonly description: Description

  public readonly createdAt: Date

  constructor(args: {
    userId: UserId
    name: Name
    username: Username
    image: Image
    description: Description
    createdAt: Date
  }) {
    this.userId = args.userId
    this.name = args.name
    this.username = args.username
    this.image = args.image
    this.description = args.description
    this.createdAt = args.createdAt
  }
}
