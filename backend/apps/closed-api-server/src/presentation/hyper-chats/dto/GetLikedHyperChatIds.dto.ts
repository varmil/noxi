import { Transform } from 'class-transformer'
import { IsArray, IsString } from 'class-validator'
import { HyperChatId } from '@domain/hyper-chat'

export class GetLikedHyperChatIds {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  ids: string[]

  toHyperChatIds = () => this.ids.map(id => new HyperChatId(Number(id)))
}
