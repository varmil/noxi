import { GroupName } from '@domain/group'
import { Gender } from '@domain/lib'
import { Period } from '@domain/lib/period'
import { Count } from '@domain/membership'
import {
  MembershipSummary,
  MembershipSummaries
} from '@domain/membership-summary'
import { ChannelId, ChannelIds } from '@domain/youtube'

export interface MembershipSummaryFindAllWhere {
  period: Period
  channelIds?: ChannelIds
  group?: GroupName
  gender?: Gender
  count?: {
    gt?: Count
    gte?: Count
    lt?: Count
    lte?: Count
  }
}

export interface MembershipSummaryRepository {
  /** 最新の状態を取得 */
  findAll: (args: {
    where?: MembershipSummaryFindAllWhere
    orderBy?: Partial<Record<'count' | 'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<MembershipSummaries>

  /** 最新の状態の件数を取得 */
  count: (args: { where?: MembershipSummaryFindAllWhere }) => Promise<number>

  /** 特定のチャンネルの最新の状態を取得 */
  findOne: (args: {
    where: { channelId: ChannelId; period: Period }
  }) => Promise<MembershipSummary | null>

  /** 特定のチャンネルの履歴を取得 */
  findHistories: (args: {
    where: {
      channelId: ChannelId
      period: Period
      createdAt: { gte?: Date; lte?: Date }
    }
    limit?: number
    offset?: number
  }) => Promise<MembershipSummaries>

  create: (args: { data: MembershipSummary }) => Promise<void>
}
