import { IsIn, IsNotEmpty } from 'class-validator'
import { GroupRegistrationStatus } from '@domain/group-registration'

const StatusStrings = ['pending', 'approved', 'rejected'] as const
type StatusString = (typeof StatusStrings)[number]

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(StatusStrings)
  status: StatusString

  toStatus = () => new GroupRegistrationStatus(this.status)
}
