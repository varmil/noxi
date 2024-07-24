import { IsOptional } from 'class-validator'
import { ChannelSort } from '@domain/youtube'

export class GetChartOfChannels {
  @IsOptional()
  sort?: string

  //   @IsNotEmpty()
  //   @IsInt()
  //   @Type(() => Number)
  //   limit: number

  toSort = () => new ChannelSort(this.sort)
}
