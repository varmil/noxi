import { Transform } from 'class-transformer'
import { LanguageTag } from '@domain/country'
import { ChannelId } from '@domain/youtube/channel/ChannelId'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'

export class ChannelBasicInfo {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly id: ChannelId
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly publishedAt: Date
  @Transform(({ value }: { value?: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag

  constructor(args: {
    id: ChannelId
    title: string
    description: string
    thumbnails: Thumbnails
    publishedAt: Date
    defaultLanguage?: LanguageTag
  }) {
    this.id = args.id
    this.title = args.title
    this.description = args.description
    this.thumbnails = args.thumbnails
    this.publishedAt = args.publishedAt
    this.defaultLanguage = args.defaultLanguage
  }
}
