import { LanguageTag } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Channel, Video, VideoId, Videos } from '@domain/youtube'

export interface VideoRepository {
  findAll: (args: {
    hl?: LanguageTag
    where: { channel: Channel }
    limit: number
  }) => Promise<PaginationResponse<Videos>>

  findById: (id: VideoId) => Promise<Video | null>
}
