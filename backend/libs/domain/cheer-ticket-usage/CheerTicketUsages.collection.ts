import { CheerTicketUsage } from '@domain/cheer-ticket-usage'
import { Collection } from '@domain/lib/Collection'

export class CheerTicketUsages extends Collection<CheerTicketUsage> {
  constructor(protected readonly list: CheerTicketUsage[]) {
    super(list)
  }
}
