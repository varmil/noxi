import { Collection } from '@domain/lib/Collection'
import { ChannelViewCountRanking } from './ChannelViewCountRanking.entity'

export class ChannelViewCountRankings extends Collection<ChannelViewCountRanking> {
  constructor(protected readonly list: ChannelViewCountRanking[]) {
    super(list)
  }
}
