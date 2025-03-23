import { Collection } from '@domain/lib/Collection'
import { MembershipSummary } from '@domain/membership-summary'

export class MembershipSummaries extends Collection<MembershipSummary> {
  constructor(protected readonly list: MembershipSummary[]) {
    super(list)
  }
}
