import { Video } from '@domain/youtube/video/Video.entity'
import { Videos } from '@domain/youtube/video/Videos.collection'

/**
 * 通常、１Channel = １VideoAggregation
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
