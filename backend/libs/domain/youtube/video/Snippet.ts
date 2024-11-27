import { Exclude, Transform } from 'class-transformer'
import { LanguageTag } from '@domain/country'
import { ChannelId, PublishedAt, Thumbnails } from '@domain/youtube'

export class VideoSnippet {
  @Transform(({ value }: { value: PublishedAt }) => value.get())
  public readonly publishedAt: PublishedAt
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly tags: string[]
  public readonly categoryId: number
  @Exclude()
  public readonly defaultLanguage?: LanguageTag

  constructor(args: {
    publishedAt: PublishedAt
    channelId: ChannelId
    title: string
    description: string
    thumbnails: Thumbnails
    tags?: string[] | null
    categoryId: number
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
