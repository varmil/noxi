import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  ValidateNested
} from 'class-validator'
import { OrderByDto } from '@presentation/dto/OrderByDto'
import { Group, GroupString, GroupStrings } from '@domain/group'
import { SupersSummaryRepository } from '@domain/supers-summary'

export class GetSupersSummaries {
  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto)
  orderBy?: OrderByDto<
    | 'last7Days'
    | 'last30Days'
    | 'last90Days'
    | 'last1Year'
    | 'thisWeek'
    | 'thisMonth'
    | 'thisYear'
  >[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toOrderBy = () => {
    return (
      (this.orderBy?.map(({ field, order }) => ({
        [field]: order
      })) as Parameters<SupersSummaryRepository['findAll']>[0]['orderBy']) ??
      undefined
    )
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
