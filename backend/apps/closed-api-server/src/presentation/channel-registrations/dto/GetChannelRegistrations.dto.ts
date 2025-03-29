import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional } from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import {
  Status,
  StatusString,
  StatusStrings
} from '@domain/channel-registration'

export class GetChannelRegistrations {
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

  toStatus = () => (this.status ? new Status(this.status) : undefined)

  toOrderBy = () => ({ appliedAt: this.orderBy?.order })

  toLimit = () => this.limit

  toOffset = () => this.offset
}
