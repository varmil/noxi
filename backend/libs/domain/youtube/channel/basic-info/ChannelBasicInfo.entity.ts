import { Transform } from 'class-transformer'
import { LanguageTag } from '@domain/country'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'

export class ChannelBasicInfo {
  public readonly id: string
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly publishedAt: Date
  @Transform(({ value }: { value?: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag

  constructor(args: {
    id: string
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
