import { Collection } from '@domain/lib/Collection'
import { SuperChat } from '@domain/supers/chat/SuperChat.entity'

export class SuperChats extends Collection<SuperChat> {
  constructor(protected readonly list: SuperChat[]) {
    super(list)
  }
}
