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

  get commentRate() {
    if (this.viewCount === 0) return 0
    return Math.min(100, (this.commentCount / this.viewCount) * 100)
  }

  get engagementCount() {
    return this.likeCount + this.commentCount
  }

  get engagementRate() {
    if (this.viewCount === 0) return 0
    return Math.min(100, (this.engagementCount / this.viewCount) * 100)
  }

  get likeRate() {
    if (this.viewCount === 0) return 0
    return Math.min(100, (this.likeCount / this.viewCount) * 100)
  }
}
