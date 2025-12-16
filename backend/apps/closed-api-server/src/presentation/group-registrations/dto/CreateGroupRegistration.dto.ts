import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { GroupId, GroupName, GroupIconSrc } from '@domain/group'
import {
  GroupRegistrationStatus,
  GroupRegistrationAppliedAt
} from '@domain/group-registration'

export class CreateGroupRegistrationDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Group ID must contain only lowercase alphanumeric characters and hyphens'
  })
  groupId: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  iconSrc: string

  toGroupId = () => new GroupId(this.groupId)

  toGroupName = () => new GroupName(this.name)

  toGroupIconSrc = () => new GroupIconSrc(this.iconSrc)

  toStatus = () => new GroupRegistrationStatus('pending')

  toAppliedAt = () => new GroupRegistrationAppliedAt(new Date())
}
