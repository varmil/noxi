import { SubscriberCountSummary } from '@domain/channel-statistics-summary'
import { Collection } from '@domain/lib/Collection'

export class SubscriberCountSummaries extends Collection<SubscriberCountSummary> {
  constructor(protected readonly list: SubscriberCountSummary[]) {
    super(list)
  }
}
