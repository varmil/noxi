import { HyperChatSchema, TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** 各Tierのローテーションスロット数 */
const ROTATION_SLOTS: Record<TierValue, number> = {
  lite: 1,
  standard: 4,
  max: 60
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
 * HyperChatの実効ローテーションスロット数を取得
 * MAXは60分経過後はstandardと同等（4スロット）
 */
function getEffectiveSlots(hyperChat: HyperChatSchema): number {
  if (hyperChat.tier === 'max' && !isMaxExclusive(hyperChat.createdAt)) {
    return ROTATION_SLOTS.standard
  }
  return ROTATION_SLOTS[hyperChat.tier]
}

/**
 * HyperChatをスロット重み付けで展開
 * 各HyperChatがそのスロット数分だけ配列に含まれる
 */
export function expandBySlots(
  hyperChats: HyperChatSchema[]
): HyperChatSchema[] {
  const result: HyperChatSchema[] = []

  for (const hyperChat of hyperChats) {
    const slots = getEffectiveSlots(hyperChat)
    for (let i = 0; i < slots; i++) {
      result.push(hyperChat)
    }
  }

  return result
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
 * 独占表示中のMAXがあればそれらのみでローテーション、なければスロット重み付けで展開
 */
export function getRotationList(
  hyperChats: HyperChatSchema[]
): HyperChatSchema[] {
  const exclusiveMaxes = getExclusiveMaxes(hyperChats)

  if (exclusiveMaxes.length > 0) {
    // 独占表示中のMAXがあればそれらのみでローテーション
    return exclusiveMaxes
  }

  // スロット重み付けで展開
  return expandBySlots(hyperChats)
}
