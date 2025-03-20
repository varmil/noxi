import { Collection } from '@domain/lib/Collection'
import { MembershipBundle } from './MembershipBundle.entity'

export class MembershipBundles extends Collection<MembershipBundle> {
  constructor(protected readonly list: MembershipBundle[]) {
    super(list)
  }
}
