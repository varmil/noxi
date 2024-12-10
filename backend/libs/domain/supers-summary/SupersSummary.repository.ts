import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { SupersSummary, SupersSummaries } from '@domain/supers-summary'
import { ChannelId, ChannelIds } from '@domain/youtube'

export interface SupersSummaryRepository {
  findAll: (args: {
    where?: { channelIds?: ChannelIds; group?: Group; gender?: Gender }
    orderBy?: Partial<
      Record<
        | 'last7Days'
        | 'last30Days'
        | 'last90Days'
        | 'last1Year'
        | 'thisWeek'
        | 'thisMonth'
        | 'thisYear',
        'asc' | 'desc'
      >
    >[]
    limit?: number
    offset?: number
  }) => Promise<SupersSummaries>

  findOne: (args: {
    where: { channelId: ChannelId }
  }) => Promise<SupersSummary | null>

  create: (args: { data: SupersSummary }) => Promise<void>
}
