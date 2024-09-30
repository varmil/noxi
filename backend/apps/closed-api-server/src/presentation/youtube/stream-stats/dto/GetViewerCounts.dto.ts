import { IsString } from 'class-validator'
import { VideoId } from '@domain/youtube'

export class GetViewerCounts {
  @IsString()
  videoId: string

  toVideoId = () => new VideoId(this.videoId)
}
