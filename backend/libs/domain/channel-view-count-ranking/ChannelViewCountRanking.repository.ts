import { GroupId } from '@domain/group'
import { ChannelViewCountRankings } from './ChannelViewCountRankings.collection'

export interface ChannelViewCountRankingRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
    limit?: number
  }) => Promise<ChannelViewCountRankings>
}
