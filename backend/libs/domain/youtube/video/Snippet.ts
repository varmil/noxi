import { Exclude, Transform } from 'class-transformer'
import { LanguageTag } from '@domain/country'
import { ChannelId, PublishedAt, Thumbnails, VideoTitle } from '@domain/youtube'

export class VideoSnippet {
  @Transform(({ value }: { value: PublishedAt }) => value.get())
  public readonly publishedAt: PublishedAt
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: VideoTitle }) => value.get())
  public readonly title: VideoTitle
  public readonly description: string
  public readonly thumbnails: Thumbnails
  @Exclude()
  public readonly tags: string[]
  @Exclude()
  public readonly categoryId: number
  @Exclude()
  public readonly defaultLanguage?: LanguageTag

  constructor(args: {
    publishedAt: PublishedAt
    channelId: ChannelId
    title: VideoTitle
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
