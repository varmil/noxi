import { Collection } from '@domain/lib/Collection'
import { MembershipBundleSum } from '@domain/membership-bundle'

export class MembershipBundleSums extends Collection<MembershipBundleSum> {
  constructor(protected readonly list: MembershipBundleSum[]) {
    super(list)
  }
}
