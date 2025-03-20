import { Collection } from '@domain/lib'
import { Membership } from './Membership.entity'

export class Memberships extends Collection<Membership> {
  constructor(protected readonly list: Membership[]) {
    super(list)
  }
}
