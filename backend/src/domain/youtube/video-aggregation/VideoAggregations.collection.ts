import { Exclude } from 'class-transformer'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

export class VideoAggregations {
  constructor(private readonly list: VideoAggregation[]) {}

  @Exclude()
  map = <U>(
    callbackfn: (
      value: VideoAggregation,
      index: number,
      array: VideoAggregation[]
    ) => U
  ): U[] => this.list.map(callbackfn)
}
