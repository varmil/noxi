import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { Video } from '@domain/youtube/video'

export class Videos extends Collection<Video> {
  constructor(protected readonly list: Video[]) {
    super(list)
  }

  @Exclude()
  selectNotMemberOnly = () =>
    new Videos(this.list.filter(video => !video.isMemberOnly()))

  @Exclude()
  averageViews = () => {
    const views = this.selectNotMemberOnly().map(
      video => video.statistics.viewCount || 0
    )
    let averageViews = views.reduce((acc, curr) => acc + curr, 0) / views.length
    if (isNaN(averageViews)) averageViews = 0
    return averageViews
  }

  @Exclude()
  averageEngagementCount = () => {
    const engagementCounts = this.selectNotMemberOnly().map(
      video => video.engagementCount || 0
    )
    let averageEngagementCount =
      engagementCounts.reduce((acc, curr) => acc + curr, 0) /
      engagementCounts.length
    if (isNaN(averageEngagementCount)) averageEngagementCount = 0
    return averageEngagementCount
  }

  @Exclude()
  averageEngagementRate = () => {
    const engagementRates = this.selectNotMemberOnly().map(
      video => video.engagementRate || 0
    )
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
}
