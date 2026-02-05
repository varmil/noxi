import { Transform } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator'
import { HyperChatId } from '@domain/hyper-chat'

export class GetLikedHyperChatIds {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Transform(({ value }: { value: string | string[] }) => {
    const arr = Array.isArray(value) ? value : [value]
    return arr.map(v => parseInt(v, 10))
  })
  ids!: number[]

  toHyperChatIds = () => this.ids.map(id => new HyperChatId(id))
}
