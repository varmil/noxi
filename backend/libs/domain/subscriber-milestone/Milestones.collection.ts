import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import type { Milestone } from './Milestone.vo'

export class Milestones extends Collection<Milestone> {
  constructor(protected readonly list: Milestone[]) {
    super(list)
  }

  /** 最大のマイルストーンを取得 */
  @Exclude()
  max(): Milestone | undefined {
    if (this.list.length === 0) return undefined
    return this.list.reduce((a, b) => (a.get() >= b.get() ? a : b))
  }

  /** 差分を取得（this - other） */
  @Exclude()
  diff(recorded: Milestones): Milestones {
    const recordedSet = new Set(recorded.list.map(m => m.get()))
    return new Milestones(
      this.list.filter(m => !recordedSet.has(m.get()))
    )
  }
}
