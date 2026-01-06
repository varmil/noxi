import { Collection } from '@domain/lib/Collection'
import { SupersSnapshot } from './SupersSnapshot.entity'

export class SupersSnapshots extends Collection<SupersSnapshot> {
  constructor(protected readonly list: SupersSnapshot[]) {
    super(list)
  }
}
