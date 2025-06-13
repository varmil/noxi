import { ViewCountSummary } from '@domain/channel-statistics-summary'
import { Collection } from '@domain/lib/Collection'

export class ViewCountSummaries extends Collection<ViewCountSummary> {
  constructor(protected readonly list: ViewCountSummary[]) {
    super(list)
  }
}
