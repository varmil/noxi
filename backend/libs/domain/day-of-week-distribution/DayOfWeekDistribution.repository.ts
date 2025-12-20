import { GroupId } from '@domain/group'
import { DayOfWeekDistributions } from './DayOfWeekDistributions.collection'

export interface DayOfWeekDistributionRepository {
  findAll: (args: {
    where: {
      dateRange: { gte: Date; lt: Date }
      group?: GroupId
    }
  }) => Promise<DayOfWeekDistributions>
}
