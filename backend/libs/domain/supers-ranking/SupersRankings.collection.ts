import { Collection } from '@domain/lib/Collection'
import { SupersRanking } from '@domain/supers-ranking'
import { ChannelId } from '@domain/youtube'
import { Exclude } from 'class-transformer'

export class SupersRankings extends Collection<SupersRanking> {
  constructor(protected readonly list: SupersRanking[]) {
    super(list)
  }

  @Exclude()
  findByChannelId = (channelId: ChannelId) =>
    this.list.find(ranking => ranking.channelId.equals(channelId)) ?? null
}
