import { Group } from '@domain/group'
import { SupersSummary, SupersSummaries } from '@domain/supers-summary'
import { ChannelId } from '@domain/youtube'

export interface SupersSummaryRepository {
  findAll: (args: {
    where?: {
      channelId?: ChannelId
      group?: Group
    }
    orderBy:
      | 'last7days'
      | 'last30days'
      | 'last90days'
      | 'last1year'
      | 'thisWeek'
      | 'thisMonth'
      | 'thisYear'
    limit?: number
    offset?: number
  }) => Promise<SupersSummaries>

  findLatest: (args: {
    where: { channelId: ChannelId }
  }) => Promise<SupersSummary | null>

  create: (args: { data: SupersSummary }) => Promise<void>
}
