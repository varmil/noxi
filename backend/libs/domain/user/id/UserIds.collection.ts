import { Collection } from '@domain/lib/Collection'
import { UserId } from '@domain/user'

export class UserIds extends Collection<UserId> {
  constructor(protected readonly list: UserId[]) {
    super(list)
  }
}
