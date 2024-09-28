import { IsString } from 'class-validator'
import { VideoId } from '@domain/youtube'

export class GetAllChatCountsDto {
  @IsString()
  videoId: string

  toVideoId = () => new VideoId(this.videoId)
}
