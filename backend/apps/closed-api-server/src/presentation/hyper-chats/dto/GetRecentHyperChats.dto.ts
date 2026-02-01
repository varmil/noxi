import { Transform } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator'
import { ChannelId } from '@domain/youtube'

export class GetRecentHyperChats {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Transform(({ value }: { value: string | string[] }) =>
    Array.isArray(value) ? value : [value]
  )
  channelIds!: string[]

  toChannelIds = () => this.channelIds.map(id => new ChannelId(id))
}
