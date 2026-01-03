import { Collection } from '@domain/lib/Collection'
import { ChannelGrowthRanking } from './ChannelGrowthRanking.entity'

export class ChannelGrowthRankings extends Collection<ChannelGrowthRanking> {
  constructor(protected readonly list: ChannelGrowthRanking[]) {
    super(list)
  }
}
