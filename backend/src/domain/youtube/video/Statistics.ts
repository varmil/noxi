export class Statistics {
  public readonly viewCount: string
  public readonly likeCount: string
  public readonly commentCount: string

  constructor(args: {
    viewCount?: string
    likeCount?: string
    commentCount?: string
  }) {
    this.viewCount = args.viewCount ?? ''
    this.likeCount = args.likeCount ?? ''
    this.commentCount = args.commentCount ?? ''
  }
}
