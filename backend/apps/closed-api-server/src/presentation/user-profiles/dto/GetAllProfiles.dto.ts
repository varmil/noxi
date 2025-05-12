import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { UserId, UserIds } from '@domain/user'

export class GetAllProfiles {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  userIds?: string[]

  @IsOptional()
  @Type(() => OrderByDto)
  orderBy: OrderByDto<'id'>

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toUserIds = () =>
    this.userIds
      ? new UserIds(this.userIds.map(id => new UserId(id)))
      : undefined

  toOrderBy = () => ({ id: this.orderBy?.order })

  toLimit = () => this.limit

  toOffset = () => this.offset
}
