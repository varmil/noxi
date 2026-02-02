import { TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** Tier別の背景色 */
export const TIER_BG_COLORS: Record<TierValue, string> = {
  lite: 'bg-cyan-300/70 dark:bg-cyan-800/70',
  standard: 'bg-yellow-300 dark:bg-yellow-800',
  max: 'bg-red-300 dark:bg-red-800'
}

/** Tier別のボーダー色 */
export const TIER_BORDER_COLORS: Record<TierValue, string> = {
  lite: 'border-cyan-300/70 dark:border-cyan-800/70',
  standard: 'border-yellow-300 dark:border-yellow-800',
  max: 'border-red-300 dark:border-red-800'
}

/** Tier別の左ボーダー色（吹き出し三角形、カード左ボーダー用） */
export const TIER_BORDER_LEFT_COLORS: Record<TierValue, string> = {
  lite: 'border-l-cyan-300/70 dark:border-l-cyan-800/70',
  standard: 'border-l-yellow-300 dark:border-l-yellow-800',
  max: 'border-l-red-300 dark:border-l-red-800'
}

/** Tier別のテキスト色（サブ/ミュート） */
export const TIER_TEXT_MUTED_COLORS: Record<TierValue, string> = {
  lite: 'text-cyan-900 dark:text-cyan-400',
  standard: 'text-yellow-900 dark:text-yellow-300',
  max: 'text-red-900 dark:text-red-300'
}
