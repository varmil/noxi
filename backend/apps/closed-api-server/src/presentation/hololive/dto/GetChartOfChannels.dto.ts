import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'
import { CountryCode } from '@domain/country'
import { ChannelSort } from '@domain/youtube'

export class GetChartOfChannelsDto {
  @IsOptional()
  sort?: string

  @IsOptional()
  country?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  toSort = () => new ChannelSort(this.sort)

  toCountryCode = () =>
    this.country ? new CountryCode(this.country) : undefined

  toLimit = () => this.limit || 50
}
