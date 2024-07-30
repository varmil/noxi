import { Exclude } from 'class-transformer'
import { Video } from '@domain/youtube/video'

export class Videos {
  constructor(private readonly list: Video[]) {}

  @Exclude()
  averageViews = () => {
    const views = this.list.map(video => video.statistics.viewCount)
    let averageViews = views.reduce((acc, curr) => acc + curr, 0) / views.length
    if (isNaN(averageViews)) averageViews = 0
    return averageViews
  }

  @Exclude()
  averageEngagementCount = () => {
    const engagementCounts = this.list.map(video => video.engagementCount || 0)
    let averageEngagementCount =
      engagementCounts.reduce((acc, curr) => acc + curr, 0) /
      engagementCounts.length
    if (isNaN(averageEngagementCount)) averageEngagementCount = 0
    return averageEngagementCount
  }

  @Exclude()
  averageEngagementRate = () => {
    const engagementRates = this.list.map(video => video.engagementRate || 0)
    let averageEngagementRate =
      engagementRates.reduce((acc, curr) => acc + curr, 0) /
      engagementRates.length
    if (isNaN(averageEngagementRate)) averageEngagementRate = 0
    return averageEngagementRate
  }

  @Exclude()
  prCount = () => {
    return this.list.filter(video => video.isPaidPromotion?.get() === true)
      .length
  }

  @Exclude()
  map = <U>(
    callbackfn: (value: Video, index: number, array: Video[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  filter = (
    callbackfn: (value: Video, index: number, array: Video[]) => unknown
  ): Video[] => this.list.filter(callbackfn)

  @Exclude()
  length = () => this.list.length
}
