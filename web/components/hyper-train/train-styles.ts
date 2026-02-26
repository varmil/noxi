/** レベル別のバッジ背景色 */
export const LEVEL_BG_COLORS: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-blue-600',
  3: 'bg-indigo-500',
  4: 'bg-violet-500',
  5: 'bg-purple-500',
  6: 'bg-fuchsia-500',
  7: 'bg-pink-500',
  8: 'bg-rose-500',
  9: 'bg-orange-600',
  10: 'bg-gradient-to-r from-rose-500 via-red-500 to-pink-500'
}

/** レベル別のボーダー色 */
export const LEVEL_BORDER_COLORS: Record<number, string> = {
  1: 'border-blue-500',
  2: 'border-blue-600',
  3: 'border-indigo-500',
  4: 'border-violet-500',
  5: 'border-purple-500',
  6: 'border-fuchsia-500',
  7: 'border-pink-500',
  8: 'border-rose-500',
  9: 'border-orange-600',
  10: 'border-red-500'
}

/** レベル別のプログレスバー色 */
export const LEVEL_PROGRESS_COLORS: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-blue-600',
  3: 'bg-indigo-500',
  4: 'bg-violet-500',
  5: 'bg-purple-500',
  6: 'bg-fuchsia-500',
  7: 'bg-pink-500',
  8: 'bg-rose-500',
  9: 'bg-orange-600',
  10: 'bg-gradient-to-r from-rose-500 via-red-500 to-pink-500'
}

export function getLevelBgColor(level: number): string {
  return LEVEL_BG_COLORS[level] ?? LEVEL_BG_COLORS[1]
}

export function getLevelBorderColor(level: number): string {
  return LEVEL_BORDER_COLORS[level] ?? LEVEL_BORDER_COLORS[1]
}

export function getLevelProgressColor(level: number): string {
  return LEVEL_PROGRESS_COLORS[level] ?? LEVEL_PROGRESS_COLORS[1]
}
