import { IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetHyperTrains {
  @IsOptional()
  @IsString()
  group?: string

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)
}
