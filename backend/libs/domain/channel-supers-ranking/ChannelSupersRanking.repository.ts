import { GroupId } from '@domain/group'
import { ChannelSupersRankings } from './ChannelSupersRankings.collection'

export interface ChannelSupersRankingRepository {
  findAll: (args: {
    where: {
      currentDate: Date
      previousDate: Date
      period: 'weekly' | 'monthly'
      group?: GroupId
    }
    limit?: number
  }) => Promise<ChannelSupersRankings>
}
