import { GroupId } from '@domain/group'
import { ChannelGrowthRankings } from './ChannelGrowthRankings.collection'

export interface ChannelGrowthRankingRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
      minSubscriberCount?: number
    }
    orderBy?: 'diff' | 'rate'
    limit?: number
  }) => Promise<ChannelGrowthRankings>
}
