import { IsIn, IsNotEmpty } from 'class-validator'
import { Status } from '@domain/channel-registration'

const StatusStrings = ['pending', 'approved', 'rejected'] as const
type StatusString = (typeof StatusStrings)[number]

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(StatusStrings)
  status: StatusString

  toStatus = () => new Status(this.status)
}
