import { Video } from '@domain/youtube/video/Video.entity'
import { Videos } from '@domain/youtube/video/Videos.collection'

/**
 * 通常、１Channel = １VideoAggregation
 *
 * TODO:
 * shortVideoViews regularVideoViews の区別
 * 変動指数（ショート、通常）：指数数値が大きければ大きいほど、コンテンツのインプッションが不安定になります。0-1は優秀，1-2は良好，2-3は普通，3-4は合格，4-5は悪い
 *
 * uploadFrequencyのショート、通常区別
 * 平均投稿頻度：コンテンツの投稿頻度と示します。アクティブ程度と安定性を表す重要な指標になります。
 *
 * averageEngagementRateのショート、通常区別
 * 0.59%-2.6% というのは登録者数相当のチャンネルの平均エンゲージメント数値です
 */
export class VideoAggregation {
  public readonly averageViews: number
  public readonly uploadFrequency: number
  public readonly liveFrequency: number
  public readonly averageEngagementRate: number

  constructor(args: {
    averageViews: number
    uploadFrequency: number
    liveFrequency: number
    averageEngagementRate: number
  }) {
    this.averageViews = args.averageViews
    this.uploadFrequency = args.uploadFrequency
    this.liveFrequency = args.liveFrequency
    this.averageEngagementRate = args.averageEngagementRate
  }

  static fromVideos(list: Video[] | Videos): VideoAggregation {
    return this.calculateStats(list)
  }

  private static calculateStats(videos: Video[] | Videos): VideoAggregation {
    const now = new Date()
    const oneMonthAgo = new Date(now.getMonth() - 1)
    // oneMonthAgo.setMonth(now.getMonth() - 1

    const views = videos.map(video => parseInt(video.statistics.viewCount))
    const averageViews =
      views.reduce((acc, curr) => acc + curr, 0) / views.length

    const recentVideos = videos.filter(
      video => video.snippet.publishedAt > oneMonthAgo
    )
    const uploadFrequency = recentVideos.length

    // FIXME:
    // const recentLiveVideos = recentVideos.filter(
    //   video => video.snippet.liveBroadcastContent === 'live'
    // )
    // const liveFrequency = recentLiveVideos.length
    const recentLiveVideos = recentVideos.filter(
      video =>
        video.liveStreamingDetails &&
        new Date(video.liveStreamingDetails.actualStartTime) > oneMonthAgo
    )
    const liveFrequency = recentLiveVideos.length

    const engagementRates = videos.map(video => video.engagementRate() || 0)
    const averageEngagementRate =
      engagementRates.reduce((acc, curr) => acc + curr, 0) /
      engagementRates.length

    return new VideoAggregation({
      averageViews,
      uploadFrequency,
      liveFrequency,
      averageEngagementRate
    })
  }
}
