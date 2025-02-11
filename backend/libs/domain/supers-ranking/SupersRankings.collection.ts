import { Collection } from '@domain/lib/Collection'
import { SupersRanking } from '@domain/supers-ranking'

export class SupersRankings extends Collection<SupersRanking> {
  constructor(protected readonly list: SupersRanking[]) {
    super(list)
  }
}
