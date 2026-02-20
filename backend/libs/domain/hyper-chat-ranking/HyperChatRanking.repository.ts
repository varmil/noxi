import { ChannelId } from '@domain/youtube'
import { AnonymousPoster } from './AnonymousPoster.entity'
import { PosterRanking } from './PosterRanking.collection'

export interface HyperChatRankingRepository {
  /** 非匿名の投稿者ランキング（金額降順） */
  findPosterRanking: (args: {
    channelId: ChannelId
    limit: number
    offset?: number
  }) => Promise<PosterRanking>

  /** 非匿名の投稿者数 */
  countPosterRanking: (args: { channelId: ChannelId }) => Promise<number>

  /** 匿名投稿の合計金額（匿名投稿がなければ null） */
  findAnonymousPoster: (args: {
    channelId: ChannelId
  }) => Promise<AnonymousPoster | null>
}
