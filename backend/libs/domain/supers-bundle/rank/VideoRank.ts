import { Transform } from 'class-transformer'
import { Rank, TopPercentage } from '@domain/supers-bundle'
import { VideoId } from '@domain/youtube'

export class VideoRank {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank
  @Transform(({ value }: { value: TopPercentage }) => value.get())
  public readonly topPercentage: TopPercentage

  constructor(args: {
    videoId: VideoId
    rank: Rank
    topPercentage: TopPercentage
  }) {
    this.videoId = args.videoId
    this.rank = args.rank
    this.topPercentage = args.topPercentage
  }
}
