import { IsNotEmpty, IsOptional } from 'class-validator'
import { CountryCode } from '@domain/country'
import { ChannelSort } from '@domain/youtube'

export class GetChartOfChannelsDto {
  @IsOptional()
  sort?: string

  @IsNotEmpty()
  country: string

  //   @IsNotEmpty()
  //   @IsInt()
  //   @Type(() => Number)
  //   limit: number

  toSort = () => new ChannelSort(this.sort)

  toCountryCode = () => new CountryCode(this.country)
}
