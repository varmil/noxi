import { IsOptional, IsString } from 'class-validator'
import { Name, Image, Description } from '@domain/user-profile'

export class PutProfile {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  description?: string

  toName = () => (this.name ? new Name(this.name) : undefined)

  toImage = () => (this.image ? new Image(this.image) : undefined)

  toDescription = () =>
    this.description ? new Description(this.description) : undefined
}
