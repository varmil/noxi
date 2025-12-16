import { IsOptional, IsString } from 'class-validator'
import { GroupName, GroupIconSrc } from '@domain/group'

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  iconSrc?: string

  toGroupName = () => (this.name ? new GroupName(this.name) : undefined)

  toGroupIconSrc = () =>
    this.iconSrc ? new GroupIconSrc(this.iconSrc) : undefined
}
