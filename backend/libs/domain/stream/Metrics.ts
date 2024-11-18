export class Metrics {
  /** 最大同時視聴者数: ライブ配信を同時に視聴した視聴者数の最大値です。 */
  public readonly peakConcurrentViewers: number
  /** 平均同時視聴者数: ライブ配信を同時に視聴した視聴者数の平均値です。 */
  public readonly avgConcurrentViewers: number
  /** チャットメッセージ数: ライブ配信中に視聴者が送信したチャットメッセージの件数 */
  public readonly chatMessages: number
  /**
   * 視聴回数: ライブ配信が配信中に視聴された合計回数です。
   * @important メンバー限定配信ではundefined
   * */
  public readonly views?: number
  /** 高評価数: The total number of users that have liked the stream. Likes transfer to the VOD archive of the live stream. */
  public readonly likes: number

  constructor(args: {
    peakConcurrentViewers: number
    avgConcurrentViewers: number
    chatMessages: number
    views?: number
    likes: number
  }) {
    this.peakConcurrentViewers = args.peakConcurrentViewers
    this.avgConcurrentViewers = args.avgConcurrentViewers
    this.chatMessages = args.chatMessages
    this.views = args.views
    this.likes = args.likes
  }

  isMemberOnly() {
    return this.views === undefined
  }

  get likeRate() {
    if (!this.views) return 0
    return Math.min(100, (this.likes / this.views) * 100)
  }
}
