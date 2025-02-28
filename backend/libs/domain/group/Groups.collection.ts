import { Exclude } from 'class-transformer'
import { Group, GroupStrings } from '@domain/group'
import { Collection } from '@domain/lib/Collection'

export class Groups extends Collection<Group> {
  constructor(protected readonly list: Group[]) {
    super(list)
  }

  @Exclude()
  get() {
    return this.list
  }
}

export const AllGroups = new Groups(GroupStrings.map(e => new Group(e)))
