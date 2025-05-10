import { CheeredUsage } from '@domain/cheer-ticket-usage'
import { Collection } from '@domain/lib/Collection'

export class CheeredUsages extends Collection<CheeredUsage> {
  constructor(protected readonly list: CheeredUsage[]) {
    super(list)
  }
}
