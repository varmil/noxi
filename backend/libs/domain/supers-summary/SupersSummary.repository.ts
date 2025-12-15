import { GroupName } from '@domain/group'
import { Gender } from '@domain/lib'
import { AmountMicros } from '@domain/lib/currency'
import { PeriodString } from '@domain/lib/period'
import { SupersSummary, SupersSummaries } from '@domain/supers-summary'
import { ChannelId, ChannelIds } from '@domain/youtube'

export type SupersSummaryFindAllWhere = {
  channelIds?: ChannelIds
  group?: GroupName
  gender?: Gender
} & Partial<
  Record<
    PeriodString,
    {
      gt?: AmountMicros
      gte?: AmountMicros
      lt?: AmountMicros
      lte?: AmountMicros
    }
  >
>

export interface SupersSummaryRepository {
  /** 最新の状態を取得 */
  findAll: (args: {
    where?: SupersSummaryFindAllWhere
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

  /** 最新の状態の件数を取得 */
  count: (args: { where?: SupersSummaryFindAllWhere }) => Promise<number>

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
