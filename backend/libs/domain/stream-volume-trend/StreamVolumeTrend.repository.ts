import { GroupId } from '@domain/group'
import { StreamVolumeTrends } from './StreamVolumeTrends.collection'

export interface StreamVolumeTrendRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
  }) => Promise<StreamVolumeTrends>
}
