import { Collection } from '@domain/lib/Collection'
import { ChannelSupersRanking } from './ChannelSupersRanking.entity'

export class ChannelSupersRankings extends Collection<ChannelSupersRanking> {
  constructor(protected readonly list: ChannelSupersRanking[]) {
    super(list)
  }
}
