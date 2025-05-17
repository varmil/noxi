import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { CheerTicketRepository, TotalCount } from '@domain/cheer-ticket'
import { UserId, UserIds } from '@domain/user'

class TotalCountDto {
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new TotalCount(Number(value)) : undefined
  )
  gte?: TotalCount

  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    value !== undefined ? new TotalCount(Number(value)) : undefined
  )
  lte?: TotalCount
}

export class GetAllCheerTickets {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  userIds?: string[]

  @IsOptional()
  @Type(() => TotalCountDto)
  totalCount?: TotalCountDto

  @IsOptional()
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<'totalCount' | 'lastClaimedAt'>[]

  @IsInt()
  @Type(() => Number)
  limit: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toUserIds = () =>
    this.userIds
      ? new UserIds(this.userIds.map(id => new UserId(id)))
      : undefined

  toTotalCount = () => this.totalCount

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<CheerTicketRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
