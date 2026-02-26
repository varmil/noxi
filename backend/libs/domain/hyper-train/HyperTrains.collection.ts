import { HyperTrain } from '@domain/hyper-train/HyperTrain.entity'
import { Collection } from '@domain/lib/Collection'

export class HyperTrains extends Collection<HyperTrain> {
  constructor(protected readonly list: HyperTrain[]) {
    super(list)
  }
}
