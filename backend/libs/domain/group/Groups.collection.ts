import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { GroupId } from './GroupId.vo'

export class Groups extends Collection<GroupId> {
  constructor(protected readonly list: GroupId[]) {
    super(list)
  }

  @Exclude()
  get() {
    return this.list
  }
}
