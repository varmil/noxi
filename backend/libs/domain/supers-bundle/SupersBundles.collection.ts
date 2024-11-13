import { Collection } from '@domain/lib/Collection'
import { SupersBundle } from './SupersBundle.entity'

export class SupersBundles extends Collection<SupersBundle> {
  constructor(protected readonly list: SupersBundle[]) {
    super(list)
  }
}
