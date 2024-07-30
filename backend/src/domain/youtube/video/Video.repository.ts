import { LanguageTag } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Channel } from '@domain/youtube'
import { Videos } from '@domain/youtube/video/Videos.collection'

export interface VideoRepository {
  findAll: (args: {
    hl?: LanguageTag
    where: { channel: Channel }
    limit: number
  }) => Promise<PaginationResponse<Videos>>
}
