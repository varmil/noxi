import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { GroupName } from './GroupName.vo'

export class Groups extends Collection<GroupName> {
  constructor(protected readonly list: GroupName[]) {
    super(list)
  }

  @Exclude()
  get() {
    return this.list
  }
}
