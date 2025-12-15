import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional } from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { GroupRegistrationStatus } from '@domain/group-registration'

const StatusStrings = ['pending', 'approved', 'rejected'] as const
type StatusString = (typeof StatusStrings)[number]

export class GetGroupRegistrationsDto {
  @IsOptional()
  @IsIn(StatusStrings)
  status?: StatusString

  @IsOptional()
  @Type(() => OrderByDto)
  orderBy: OrderByDto<'appliedAt'>

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toStatus = () =>
    this.status ? new GroupRegistrationStatus(this.status) : undefined

  toOrderBy = () => ({ appliedAt: this.orderBy?.order })

  toLimit = () => this.limit || 30

  toOffset = () => this.offset || 0
}
