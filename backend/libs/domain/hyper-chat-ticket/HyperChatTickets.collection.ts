import { Collection } from '@domain/lib/Collection'
import { HyperChatTicket } from './HyperChatTicket.entity'

export class HyperChatTickets extends Collection<HyperChatTicket> {
  constructor(protected readonly list: HyperChatTicket[]) {
    super(list)
  }
}
