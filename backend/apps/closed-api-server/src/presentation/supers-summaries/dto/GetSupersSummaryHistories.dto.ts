import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsRFC3339 } from 'class-validator'

export class GetSupersSummaryHistories {
  @IsOptional()
  @IsRFC3339()
  createdBefore?: string

  @IsOptional()
  @IsRFC3339()
  createdAfter?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toCreatedBefore = () => {
    return this.createdBefore ? new Date(this.createdBefore) : undefined
  }

  toCreatedAfter = () => {
    return this.createdAfter ? new Date(this.createdAfter) : undefined
  }

  toLimit = () => this.limit

  toOffset = () => this.offset
}
