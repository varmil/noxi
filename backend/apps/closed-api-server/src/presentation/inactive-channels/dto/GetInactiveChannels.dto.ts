import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class GetInactiveChannelsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(36)
  inactiveMonths?: number

  toInactiveMonths(): number {
    return this.inactiveMonths ?? 6
  }
}
