import { Collection } from '@domain/lib/Collection'
import { SupersMonthlySummary } from '@domain/supers-summary'

export class SupersMonthlySummaries extends Collection<SupersMonthlySummary> {
  constructor(protected readonly list: SupersMonthlySummary[]) {
    super(list)
  }
}
