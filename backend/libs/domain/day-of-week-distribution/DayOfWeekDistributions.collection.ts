import { Collection } from '@domain/lib/Collection'
import { DayOfWeekDistribution } from './DayOfWeekDistribution.entity'

export class DayOfWeekDistributions extends Collection<DayOfWeekDistribution> {
  constructor(protected readonly list: DayOfWeekDistribution[]) {
    super(list)
  }
}
