import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { GroupId, GroupName, GroupIconSrc } from '@domain/group'

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Group ID must contain only lowercase alphanumeric characters and hyphens'
  })
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  iconSrc: string

  toGroupId = () => new GroupId(this.id)

  toGroupName = () => new GroupName(this.name)

  toGroupIconSrc = () => new GroupIconSrc(this.iconSrc)
}
