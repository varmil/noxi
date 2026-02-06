import { TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** Tier別のテキスト色 */
export const TIER_TEXT_COLORS: Record<TierValue, string> = {
  free: '',
  lite: '',
  standard: '',
  max: 'text-white'
}

/** Tier別の背景色 */
export const TIER_BG_COLORS: Record<TierValue, string> = {
  free: 'bg-green-200/70 dark:bg-green-900/70',
  lite: 'bg-cyan-300/70 dark:bg-cyan-800/70',
  standard: 'bg-yellow-300 dark:bg-yellow-800',
  max: 'bg-red-600 dark:bg-red-800'
}

/** Tier別のボーダー色 */
export const TIER_BORDER_COLORS: Record<TierValue, string> = {
  free: 'border-green-200/70 dark:border-green-900/70',
  lite: 'border-cyan-300/70 dark:border-cyan-800/70',
  standard: 'border-yellow-300 dark:border-yellow-800',
  max: 'border-red-600 dark:border-red-800'
}

/** Tier別の左ボーダー色（吹き出し三角形、カード左ボーダー用） */
export const TIER_BORDER_LEFT_COLORS: Record<TierValue, string> = {
  free: 'border-l-green-300/70 dark:border-l-green-800/70',
  lite: 'border-l-cyan-400/70 dark:border-l-cyan-700/70',
  standard: 'border-l-yellow-400 dark:border-l-yellow-700',
  max: 'border-l-red-700 dark:border-l-red-700'
}

/** Tier別のテキスト色（サブ/ミュート） */
export const TIER_TEXT_MUTED_COLORS: Record<TierValue, string> = {
  free: 'text-green-900 dark:text-gray-300',
  lite: 'text-cyan-900 dark:text-gray-300',
  standard: 'text-yellow-900 dark:text-gray-300',
  max: 'text-red-200 dark:text-gray-300'
}

/** Tier別のリング色（選択状態用） */
export const TIER_RING_COLORS: Record<TierValue, string> = {
  free: 'ring-green-500',
  lite: 'ring-cyan-500',
  standard: 'ring-yellow-500',
  max: 'ring-red-600'
}

/** Tier別のスライダードット色（ソリッド） */
export const TIER_DOT_COLORS: Record<TierValue, string> = {
  free: 'bg-green-500',
  lite: 'bg-cyan-500',
  standard: 'bg-yellow-500',
  max: 'bg-red-600'
}

/** Tier別のアクセントテキスト色 */
export const TIER_ACCENT_TEXT_COLORS: Record<TierValue, string> = {
  free: 'text-green-600 dark:text-green-400',
  lite: 'text-cyan-600 dark:text-cyan-400',
  standard: 'text-yellow-600 dark:text-yellow-400',
  max: 'text-red-600 dark:text-red-400'
}
