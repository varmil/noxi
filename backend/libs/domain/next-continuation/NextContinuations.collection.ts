import { Collection } from '@domain/lib/Collection'
import { NextContinuation } from '@domain/next-continuation'

export class NextContinuations extends Collection<NextContinuation> {
  constructor(protected readonly list: NextContinuation[]) {
    super(list)
  }
}
