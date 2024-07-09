export class Statistics {
  public readonly viewCount: number
  public readonly likeCount: number
  public readonly commentCount: number

  constructor(args: {
    viewCount: number
    likeCount: number
    commentCount: number
  }) {
    this.viewCount = args.viewCount
    this.likeCount = args.likeCount
    this.commentCount = args.commentCount
  }

  engagementCount() {
    return this.likeCount + this.commentCount
  }

  engagementRate() {
    return (this.engagementCount() / this.viewCount) * 100
  }
}
