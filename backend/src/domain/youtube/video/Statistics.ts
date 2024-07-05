export class Statistics {
  public readonly viewCount: string
  public readonly likeCount: string
  public readonly commentCount: string

  constructor(args: {
    viewCount?: string
    likeCount?: string
    commentCount?: string
  }) {
    this.viewCount = args.viewCount ?? '0'
    this.likeCount = args.likeCount ?? '0'
    this.commentCount = args.commentCount ?? '0'
  }

  engagementCount() {
    return Number(this.likeCount) + Number(this.commentCount)
  }

  engagementRate() {
    return (this.engagementCount() / Number(this.viewCount)) * 100
  }
}
