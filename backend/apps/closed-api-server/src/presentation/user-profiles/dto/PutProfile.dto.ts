import { IsOptional, IsString } from 'class-validator'
import { Name, Image, Description, Username } from '@domain/user-profile'

export class PutProfile {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  description?: string

  toName = () => (this.name ? new Name(this.name) : undefined)

  toUsername = () => (this.username ? new Username(this.username) : undefined)

  toImage = () => (this.image ? new Image(this.image) : undefined)

  toDescription = () =>
    this.description ? new Description(this.description) : undefined
}
