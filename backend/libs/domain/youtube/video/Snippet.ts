import { Exclude } from 'class-transformer'
import { LanguageTag } from '@domain/country'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'

export class Snippet {
  public readonly publishedAt: Date
  public readonly channelId: string
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly tags: string[]
  public readonly categoryId: string
  @Exclude()
  public readonly defaultLanguage?: LanguageTag

  constructor(args: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    tags?: string[] | null
    categoryId: string
    defaultLanguage?: LanguageTag
  }) {
    this.publishedAt = args.publishedAt
    this.channelId = args.channelId
    this.title = args.title
    this.description = args.description
    this.thumbnails = args.thumbnails
    this.tags = args.tags ?? []
    this.categoryId = args.categoryId
    this.defaultLanguage = args.defaultLanguage
  }
}
