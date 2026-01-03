import { Collection } from '@domain/lib/Collection'
import { GoldenTime } from './GoldenTime.entity'

export class GoldenTimes extends Collection<GoldenTime> {
  constructor(protected readonly list: GoldenTime[]) {
    super(list)
  }
}
