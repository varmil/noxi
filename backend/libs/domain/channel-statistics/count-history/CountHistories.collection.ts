import { Collection } from '@domain/lib/Collection'
import { CountHistory } from './CountHistory.entity'

export class CountHistories extends Collection<CountHistory> {
  constructor(protected readonly list: CountHistory[]) {
    super(list)
  }
}
