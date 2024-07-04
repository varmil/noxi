interface _Video {
  id: string
  snippet: {
    publishedAt: string
    title: string
    liveBroadcastContent: string
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string
    engagementRate?: number
  }
}

export class Video {
  public readonly id: string
  public readonly title: string
  public readonly description: string
  public readonly publishedAt: Date

  constructor(args: {
    id: string
    title: string
    description: string
    publishedAt: Date
  }) {
    this.id = args.id
    this.title = args.title
    this.description = args.description
    this.publishedAt = args.publishedAt
  }
}
