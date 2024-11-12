import { Collection } from '@domain/lib/Collection'
import { SupersBundleQueue } from './SupersBundleQueue.entity'

export class SupersBundleQueues extends Collection<SupersBundleQueue> {
  constructor(protected readonly list: SupersBundleQueue[]) {
    super(list)
  }
}
