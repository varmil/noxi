import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { VideoId } from '@domain/youtube'

export class VideoIds extends Collection<VideoId> {
  constructor(protected readonly list: VideoId[]) {
    super(list)
  }

  @Exclude()
  join = (separator?: string) => this.list.map(e => e.get()).join(separator)
}
