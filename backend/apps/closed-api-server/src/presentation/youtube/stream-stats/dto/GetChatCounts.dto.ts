import { IsString } from 'class-validator'
import { VideoId } from '@domain/youtube'

export class GetChatCountsDto {
  @IsString()
  videoId: string

  toVideoId = () => new VideoId(this.videoId)
}
