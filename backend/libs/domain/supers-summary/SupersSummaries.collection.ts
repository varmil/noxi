import { Collection } from '@domain/lib/Collection'
import { SupersSummary } from '@domain/supers-summary'

export class SupersSummaries extends Collection<SupersSummary> {
  constructor(protected readonly list: SupersSummary[]) {
    super(list)
  }
}
