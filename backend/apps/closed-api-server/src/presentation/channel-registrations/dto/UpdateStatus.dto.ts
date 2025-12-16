import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Status } from '@domain/channel-registration'
import { GroupId } from '@domain/group'

const StatusStrings = ['pending', 'approved', 'rejected'] as const
type StatusString = (typeof StatusStrings)[number]

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(StatusStrings)
  status: StatusString

  @IsOptional()
  @IsString()
  group?: string

  toStatus = () => new Status(this.status)

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)
}
