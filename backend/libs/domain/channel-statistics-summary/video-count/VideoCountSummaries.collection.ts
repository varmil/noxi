import { VideoCountSummary } from '@domain/channel-statistics-summary'
import { Collection } from '@domain/lib/Collection'

export class VideoCountSummaries extends Collection<VideoCountSummary> {
  constructor(protected readonly list: VideoCountSummary[]) {
    super(list)
  }
}
