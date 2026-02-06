import { HyperChatSchema, TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** 各Tierのソート優先度（大きいほど前に表示） */
const TIER_PRIORITY: Record<TierValue, number> = {
  free: 1,
  lite: 1,
  standard: 4,
  max: 100
}

/** MAXの独占表示時間（分） */
const MAX_EXCLUSIVE_MINUTES = 60

/**
 * MAXが独占表示中かどうかを判定
 * 投稿から60分以内はMAXが独占
 */
function isMaxExclusive(createdAt: Date): boolean {
  const diffMinutes = (Date.now() - createdAt.getTime()) / 60000
  return diffMinutes <= MAX_EXCLUSIVE_MINUTES
}

/**
 * HyperChatのソート優先度を取得
 * max > standard > lite の順
 */
function getTierPriority(hyperChat: HyperChatSchema): number {
  return TIER_PRIORITY[hyperChat.tier]
}

/**
 * HyperChatをTier優先度でソート
 * max > standard > lite、同 Tier は createdAt 降順（新しい順）
 */
export function sortByTierPriority(
  hyperChats: HyperChatSchema[]
): HyperChatSchema[] {
  return [...hyperChats].sort((a, b) => {
    const priorityA = getTierPriority(a)
    const priorityB = getTierPriority(b)

    // 優先度降順
    if (priorityA !== priorityB) {
      return priorityB - priorityA
    }

    // 同 Tier は createdAt 降順（新しい順）
    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

/**
 * 独占表示中のMAX HyperChatを取得
 * 複数ある場合は古い順（投稿が早い順）にソートして返す
 */
export function getExclusiveMaxes(
  hyperChats: HyperChatSchema[]
): HyperChatSchema[] {
  const exclusiveMaxes = hyperChats.filter(
    hc => hc.tier === 'max' && isMaxExclusive(hc.createdAt)
  )

  // 古い順（投稿が早い順）にソート
  return exclusiveMaxes.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  )
}

/**
 * ローテーション表示用のHyperChatリストを生成
 * 独占表示中のMAXがあればそれらのみ、なければTier優先度でソート
 */
export function getRotationList(
  hyperChats: HyperChatSchema[]
): HyperChatSchema[] {
  const exclusiveMaxes = getExclusiveMaxes(hyperChats)

  if (exclusiveMaxes.length > 0) {
    // 独占表示中のMAXがあればそれらのみでローテーション
    return exclusiveMaxes
  }

  // Tier優先度でソート
  return sortByTierPriority(hyperChats)
}
