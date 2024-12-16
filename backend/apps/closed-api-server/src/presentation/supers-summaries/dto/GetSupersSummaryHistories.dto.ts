import { IsOptional, IsRFC3339 } from 'class-validator'

export class GetSupersSummaryHistories {
  @IsOptional()
  @IsRFC3339()
  createdBefore?: string

  @IsRFC3339()
  createdAfter: string

  toCreatedBefore = () => {
    return this.createdBefore ? new Date(this.createdBefore) : undefined
  }

  toCreatedAfter = () => {
    return new Date(this.createdAfter)
  }
}
