import { GroupId } from '@domain/group'
import { HyperChatId, IsAnonymous } from '@domain/hyper-chat'
import {
  HyperTrain,
  HyperTrainId,
  HyperTrains,
  Level,
  TotalPoint
} from '@domain/hyper-train'
import { Point } from '@domain/hyper-train/Point.vo'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

interface FindOneWhere {
  id?: HyperTrainId
  channelId?: ChannelId
  expiresAt?: { gt?: Date }
}

interface FindAllWhere {
  channelId?: ChannelId
  group?: GroupId
  expiresAt?: { gt?: Date }
}

export interface HyperTrainRepository {
  /**
   * 条件に一致するハイパートレインを1件取得
   */
  findOne: (args: { where: FindOneWhere }) => Promise<HyperTrain | null>

  /**
   * 条件に一致するハイパートレイン一覧を取得
   */
  findAll: (args: {
    where: FindAllWhere
    orderBy?: Partial<Record<'level' | 'totalPoint' | 'startedAt', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<HyperTrains>

  /**
   * チャンネルのベストレコード（最高レベル）を取得（contributors含む）
   */
  findBestByChannelId: (channelId: ChannelId) => Promise<HyperTrain | null>

  /**
   * 過去N分間のユニークユーザー数をカウント（HyperChatテーブルから）
   */
  countRecentUniqueUsers: (
    channelId: ChannelId,
    withinMinutes: number
  ) => Promise<number>

  /**
   * ハイパートレインを作成
   */
  create: (args: {
    data: {
      channelId: ChannelId
      group: GroupId
      level: Level
      totalPoint: TotalPoint
      startedAt: Date
      expiresAt: Date
    }
  }) => Promise<HyperTrainId>

  /**
   * 貢献を追加
   */
  addContribution: (args: {
    data: {
      hyperTrainId: HyperTrainId
      hyperChatId: HyperChatId
      userId: UserId
      point: Point
      isAnonymous?: IsAnonymous
    }
  }) => Promise<void>

  /**
   * トレインのレベル・ポイント・期限を更新
   */
  update: (args: {
    id: HyperTrainId
    data: {
      level: Level
      totalPoint: TotalPoint
      expiresAt?: Date
    }
  }) => Promise<void>
}
