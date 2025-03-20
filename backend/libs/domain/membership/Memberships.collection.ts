import { Collection } from '@domain/lib'
import { Count } from '@domain/membership'
import { Membership } from './Membership.entity'

export class Memberships extends Collection<Membership> {
  constructor(protected readonly list: Membership[]) {
    super(list)
  }

  /** 各メンバーシップイベントのcountの合計 */
  countAll() {
    return new Count(
      this.list.reduce((acc, membership) => acc + membership.count.get(), 0)
    )
  }
}
