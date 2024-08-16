import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator'
import { ChannelId, ChannelIds } from '@domain/youtube'

export class GetChannelsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  ids?: string[]

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number

  toIds = () =>
    this.ids
      ? new ChannelIds(this.ids?.map(id => new ChannelId(id)))
      : undefined
}
