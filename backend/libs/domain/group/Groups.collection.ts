import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { Group } from './Group.entity'

export class Groups extends Collection<Group> {
  constructor(protected readonly list: Group[]) {
    super(list)
  }

  @Exclude()
  get() {
    return this.list
  }
}
