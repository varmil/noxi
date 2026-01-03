import { GroupId } from '@domain/group'
import { GoldenTimes } from './GoldenTimes.collection'

export interface GoldenTimeRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
  }) => Promise<GoldenTimes>
}
