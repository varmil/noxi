import { Collection } from '@domain/lib/Collection'
import { ConcurrentViewerTrend } from './ConcurrentViewerTrend.entity'

export class ConcurrentViewerTrends extends Collection<ConcurrentViewerTrend> {
  constructor(protected readonly list: ConcurrentViewerTrend[]) {
    super(list)
  }
}
