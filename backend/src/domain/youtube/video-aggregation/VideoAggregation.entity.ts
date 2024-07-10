import { IsDecimal, IsInt, Min } from 'class-validator'
import { Video } from '@domain/youtube/video/Video.entity'
import { Videos } from '@domain/youtube/video/Videos.collection'

class Aggregation {
  @IsInt()
  @Min(0)
  public readonly averageViews: number
  @IsInt()
  @Min(0)
  public readonly frequency: number
  @IsInt()
  @Min(0)
  public readonly averageEngagementCount: number
  @IsDecimal({ decimal_digits: '2' })
  @Min(0)
  public readonly averageEngagementRate: string

  constructor(args: {
    averageViews: number
    frequency: number
    averageEngagementCount: number
    averageEngagementRate: number
  }) {
    this.averageViews = Math.round(args.averageViews)
    this.frequency = Math.round(args.frequency)
    this.averageEngagementCount = Math.round(args.averageEngagementCount)
    this.averageEngagementRate = args.averageEngagementRate.toFixed(2)
  }
}

/**
 * １Channel = １VideoAggregation
 *
 * 変動指数（ショート、通常）：指数数値が大きければ大きいほど、コンテンツのインプッションが不安定になります。0-1は優秀，1-2は良好，2-3は普通，3-4は合格，4-5は悪い
 *
 * 平均投稿頻度：コンテンツの投稿頻度と示します。アクティブ程度と安定性を表す重要な指標になります。
 *
 * 0.59%-2.6% というのは登録者数相当のチャンネルの平均エンゲージメント数値です
 */
export class VideoAggregation {
  public readonly regular: Aggregation
  public readonly short: Aggregation
  public readonly live: Aggregation

  constructor(args: {
    regular: Aggregation
    short: Aggregation
    live: Aggregation
  }) {
    this.regular = args.regular
    this.short = args.short
    this.live = args.live
  }

  static fromVideos(list: Video[] | Videos): VideoAggregation {
    return this.calculateStats(list)
  }

  private static calculateStats(videos: Video[] | Videos): VideoAggregation {
    const { short, regular, live } = this.getRecentVideos(videos)
    return new VideoAggregation({
      regular: this.getAggregation(regular),
      short: this.getAggregation(short),
      live: this.getAggregation(live)
    })
  }

  private static getRecentVideos(videos: Video[] | Videos): {
    short: Videos
    regular: Videos
    live: Videos
  } {
    const now = new Date()
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(now.getMonth() - 1)

    const recentVideos = videos.filter(
      video => video.snippet.publishedAt > oneMonthAgo
    )

    return {
      short: new Videos(recentVideos.filter(video => video.isShort())),
      regular: new Videos(recentVideos.filter(video => !video.isShort())),
      live: new Videos(
        recentVideos.filter(
          video =>
            video.liveStreamingDetails &&
            new Date(video.liveStreamingDetails.actualStartTime) > oneMonthAgo
        )
      )
    }
  }

  private static getAggregation(videos: Videos): Aggregation {
    const views = videos.map(video => video.statistics.viewCount)
    let averageViews = views.reduce((acc, curr) => acc + curr, 0) / views.length
    if (isNaN(averageViews)) averageViews = 0

    const engagementCounts = videos.map(video => video.engagementCount || 0)
    let averageEngagementCount =
      engagementCounts.reduce((acc, curr) => acc + curr, 0) /
      engagementCounts.length
    if (isNaN(averageEngagementCount)) averageEngagementCount = 0

    const engagementRates = videos.map(video => video.engagementRate || 0)
    let averageEngagementRate =
      engagementRates.reduce((acc, curr) => acc + curr, 0) /
      engagementRates.length
    if (isNaN(averageEngagementRate)) averageEngagementRate = 0

    return new Aggregation({
      averageViews,
      frequency: videos.length(),
      averageEngagementCount,
      averageEngagementRate
    })
  }
}
