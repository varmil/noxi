import { Exclude } from 'class-transformer'
import { User } from '@prisma/generated/client'
import { Collection } from '@domain/lib/Collection'
import { UserId, UserIds } from '@domain/user'

export class Users extends Collection<User> {
  constructor(protected readonly list: User[]) {
    super(list)
  }

  @Exclude()
  ids(): UserIds {
    return new UserIds(this.list.map(e => new UserId(e.id)))
  }
}
