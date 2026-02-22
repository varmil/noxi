import { GroupId } from '@domain/group'
import { HyperChats, IsAnonymous, Tier } from '@domain/hyper-chat'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'

interface FindAllWhere {
  userId?: UserId
  group?: GroupId
  gender?: Gender
  tier?: Tier
  isAnonymous?: IsAnonymous
  createdAt?: { gte?: Date; lte?: Date }
}

export interface HyperChatAdminRepository {
  /**
   * Ban を含む全ハイパーチャット一覧を取得（管理用）
   */
  findAll: (args: {
    where: FindAllWhere
    orderBy?: Partial<
      Record<'createdAt' | 'tier' | 'likeCount' | 'amount', 'asc' | 'desc'>
    >[]
    limit: number
    offset?: number
  }) => Promise<HyperChats>

  /**
   * Ban を含む全ハイパーチャット件数を取得（管理用）
   */
  count: (args: { where: FindAllWhere }) => Promise<number>
}
