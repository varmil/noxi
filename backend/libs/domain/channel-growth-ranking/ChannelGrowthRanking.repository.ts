import { GroupId } from '@domain/group'
import { ChannelGrowthRankings } from './ChannelGrowthRankings.collection'

export interface ChannelGrowthRankingRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
    limit?: number
  }) => Promise<ChannelGrowthRankings>
}
