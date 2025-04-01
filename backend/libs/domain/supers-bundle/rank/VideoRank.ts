import { Transform } from 'class-transformer'
import { Rank } from '@domain/supers-bundle'
import { VideoId } from '@domain/youtube'

export class VideoRank {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  constructor(args: { videoId: VideoId; rank: Rank }) {
    this.videoId = args.videoId
    this.rank = args.rank
  }
}
