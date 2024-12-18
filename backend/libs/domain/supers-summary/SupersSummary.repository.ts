import { Group } from '@domain/group'
import { Gender } from '@domain/lib'
import { SupersSummary, SupersSummaries } from '@domain/supers-summary'
import { ChannelId, ChannelIds } from '@domain/youtube'

export interface SupersSummaryRepository {
  /** 最新の状態を取得 */
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

  /** 特定のチャンネルの最新の状態を取得 */
  findOne: (args: {
    where: { channelId: ChannelId }
  }) => Promise<SupersSummary | null>

  /** 特定のチャンネルの履歴を取得 */
  findHistories: (args: {
    where: { channelId: ChannelId; createdAt: { gte?: Date; lte?: Date } }
    limit?: number
    offset?: number
  }) => Promise<SupersSummaries>

  create: (args: { data: SupersSummary }) => Promise<void>
}
