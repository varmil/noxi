import { Collection } from '@domain/lib/Collection'
import { VideoRank } from '@domain/supers-bundle'

export class VideoRanks extends Collection<VideoRank> {
  constructor(protected readonly list: VideoRank[]) {
    super(list)
  }
}
