import { Collection } from '@domain/lib/Collection'
import { Poster } from './Poster.entity'

export class PosterRanking extends Collection<Poster> {
  constructor(protected readonly list: Poster[]) {
    super(list)
  }
}
