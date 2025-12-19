import { GroupId } from '@domain/group'
import { ConcurrentViewerTrends } from './ConcurrentViewerTrends.collection'

export interface ConcurrentViewerTrendRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
  }) => Promise<ConcurrentViewerTrends>
}
