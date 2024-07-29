import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Channel } from '@domain/youtube'
import { Videos } from '@domain/youtube/video/Videos.collection'

export interface VideoRepository {
  findAll: (args: {
    where: { channel: Channel }
    limit: number
  }) => Promise<PaginationResponse<Videos>>
}
