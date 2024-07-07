export class Statistics {
  public readonly viewCount: number
  public readonly likeCount: number
  public readonly commentCount: number

  constructor(args: {
    viewCount?: string | number
    likeCount?: string | number
    commentCount?: string | number
  }) {
    this.viewCount = Number(args.viewCount) ?? 0
    this.likeCount = Number(args.likeCount) ?? 0
    this.commentCount = Number(args.commentCount) ?? 0
  }

  engagementCount() {
    return this.likeCount + this.commentCount
  }

  engagementRate() {
    return (this.engagementCount() / this.viewCount) * 100
  }
}
