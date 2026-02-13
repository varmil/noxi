import { TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** Tier別のテキスト色 */
export const TIER_TEXT_COLORS: Record<TierValue, string> = {
  free: '',
  lite: 'dark:text-black',
  standard: 'dark:text-black',
  max: 'text-white'
}

/** Tier別の背景色 */
export const TIER_BG_COLORS: Record<TierValue, string> = {
  free: 'bg-gray-200/70 dark:bg-gray-900/70',
  lite: 'bg-cyan-300 dark:bg-cyan-500',
  standard: 'bg-yellow-300 dark:bg-yellow-500',
  max: 'bg-red-600 dark:bg-red-700'
}

/** Tier別のボーダー色 */
export const TIER_BORDER_COLORS: Record<TierValue, string> = {
  free: 'border-gray-200/70 dark:border-gray-900/70',
  lite: 'border-cyan-300 dark:border-cyan-500',
  standard: 'border-yellow-300 dark:border-yellow-500',
  max: 'border-red-600 dark:border-red-700'
}

/** Tier別の左ボーダー色（吹き出し三角形、カード左ボーダー用） */
export const TIER_BORDER_LEFT_COLORS: Record<TierValue, string> = {
  free: 'border-l-gray-300/70 dark:border-l-gray-800/70',
  lite: 'border-l-cyan-400 dark:border-l-cyan-400',
  standard: 'border-l-yellow-400 dark:border-l-yellow-400',
  max: 'border-l-red-700 dark:border-l-red-600'
}

/** Tier別のテキスト色（サブ/ミュート） */
export const TIER_TEXT_MUTED_COLORS: Record<TierValue, string> = {
  free: 'text-gray-600 dark:text-gray-400',
  lite: 'text-cyan-900 dark:text-gray-900',
  standard: 'text-yellow-800 dark:text-gray-800',
  max: 'text-gray-50 dark:text-gray-300'
}

/** Tier別のリング色（選択状態用） */
export const TIER_RING_COLORS: Record<TierValue, string> = {
  free: 'ring-gray-500',
  lite: 'ring-cyan-500',
  standard: 'ring-yellow-500',
  max: 'ring-red-600'
}

/** Tier別のスライダードット色（ソリッド） */
export const TIER_DOT_COLORS: Record<TierValue, string> = {
  free: 'bg-gray-500',
  lite: 'bg-cyan-500',
  standard: 'bg-yellow-500',
  max: 'bg-red-600'
}

/** Tier別のアクセントテキスト色 */
export const TIER_ACCENT_TEXT_COLORS: Record<TierValue, string> = {
  free: 'text-gray-600 dark:text-gray-300',
  lite: 'text-cyan-600 dark:text-cyan-400',
  standard: 'text-yellow-600 dark:text-yellow-400',
  max: 'text-red-600 dark:text-red-400'
}
