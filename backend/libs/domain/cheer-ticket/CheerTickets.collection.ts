import { CheerTicket } from '@domain/cheer-ticket'
import { Collection } from '@domain/lib/Collection'

export class CheerTickets extends Collection<CheerTicket> {
  constructor(protected readonly list: CheerTicket[]) {
    super(list)
  }
}
