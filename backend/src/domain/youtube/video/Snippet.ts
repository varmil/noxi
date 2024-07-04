import { Thumbnails } from '@domain/youtube/image/Thumbnail'

export class Snippet {
  public readonly publishedAt: Date
  public readonly channelId: string
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly tags: string[]
  public readonly categoryId: string

  constructor(args: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    tags: string[]
    categoryId: string
  }) {
    this.publishedAt = args.publishedAt
    this.channelId = args.channelId
    this.title = args.title
    this.description = args.description
    this.thumbnails = args.thumbnails
    this.tags = args.tags
    this.categoryId = args.categoryId
  }
}
