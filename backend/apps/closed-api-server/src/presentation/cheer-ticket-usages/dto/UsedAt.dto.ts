import { IsOptional, IsRFC3339 } from 'class-validator'

/** usedAtによる絞り込み */
export class UsedAtDto {
  @IsOptional()
  @IsRFC3339()
  gte: string

  @IsOptional()
  @IsRFC3339()
  lte?: string
}
