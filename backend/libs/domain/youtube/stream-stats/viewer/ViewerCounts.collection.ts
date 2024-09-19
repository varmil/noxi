import { Collection } from '@domain/lib/Collection'
import { ViewerCount } from '@domain/youtube/stream-stats'

export class ViewerCounts extends Collection<ViewerCount> {
  constructor(protected readonly list: ViewerCount[]) {
    super(list)
  }
}
