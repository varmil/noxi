import { Collection } from '@domain/lib/Collection'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

export class VideoAggregations extends Collection<VideoAggregation> {
  constructor(protected readonly list: VideoAggregation[]) {
    super(list)
  }
}
