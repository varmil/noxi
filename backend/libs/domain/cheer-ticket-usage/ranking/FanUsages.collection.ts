import { FanUsage } from '@domain/cheer-ticket-usage'
import { Collection } from '@domain/lib/Collection'

export class FanUsages extends Collection<FanUsage> {
  constructor(protected readonly list: FanUsage[]) {
    super(list)
  }
}
