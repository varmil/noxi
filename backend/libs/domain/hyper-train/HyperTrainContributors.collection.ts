import { Exclude } from 'class-transformer'
import { HyperTrainContributor } from '@domain/hyper-train/HyperTrainContributor.entity'
import { Collection } from '@domain/lib/Collection'

export class HyperTrainContributors extends Collection<HyperTrainContributor> {
  constructor(protected readonly list: HyperTrainContributor[]) {
    super(list)
  }

  @Exclude()
  get(): HyperTrainContributor[] {
    return this.list
  }
}
