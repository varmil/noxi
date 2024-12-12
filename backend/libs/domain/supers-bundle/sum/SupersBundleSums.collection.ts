import { Collection } from '@domain/lib/Collection'
import { SupersBundleSum } from '@domain/supers-bundle'

export class SupersBundleSums extends Collection<SupersBundleSum> {
  constructor(protected readonly list: SupersBundleSum[]) {
    super(list)
  }
}
