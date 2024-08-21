import { LanguageTag } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Channel, Video, VideoId, VideoIds, Videos } from '@domain/youtube'

export interface VideoRepository {
  findByChannel: (args: {
    hl?: LanguageTag
    where: { channel: Channel }
    limit: number
  }) => Promise<PaginationResponse<Videos>>

  findById: (id: VideoId) => Promise<Video | null>

  findAll: (args: {
    where: { ids: VideoIds }
    limit: number
  }) => Promise<PaginationResponse<Videos>>
}
