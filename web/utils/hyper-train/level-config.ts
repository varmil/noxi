export const HYPER_TRAIN_LEVEL_THRESHOLDS = [
  { level: 1, requiredPoints: 0 },
  { level: 2, requiredPoints: 1500 },
  { level: 3, requiredPoints: 5000 },
  { level: 4, requiredPoints: 10000 },
  { level: 5, requiredPoints: 15000 },
  { level: 6, requiredPoints: 30000 },
  { level: 7, requiredPoints: 45000 },
  { level: 8, requiredPoints: 60000 },
  { level: 9, requiredPoints: 80000 },
  { level: 10, requiredPoints: 100000 }
] as const

export const MAX_LEVEL = 10
export const TRAIN_TRIGGER_UNIQUE_USERS = 3

/**
 * 次のレベルまでの残りポイントを返す
 * 最大レベルの場合は 0 を返す
 */
export function getPointsToNextLevel(
  level: number,
  totalPoint: number
): number {
  if (level >= MAX_LEVEL) return 0

  const nextThreshold = HYPER_TRAIN_LEVEL_THRESHOLDS[level]
  if (!nextThreshold) return 0

  return Math.max(0, nextThreshold.requiredPoints - totalPoint)
}

/**
 * 次のレベルまでの進捗率 (0-100) を返す
 * 最大レベルの場合は 100 を返す
 */
export function getProgressToNextLevel(
  level: number,
  totalPoint: number
): number {
  if (level >= MAX_LEVEL) return 100

  const currentThreshold = HYPER_TRAIN_LEVEL_THRESHOLDS[level - 1]
  const nextThreshold = HYPER_TRAIN_LEVEL_THRESHOLDS[level]

  if (!currentThreshold || !nextThreshold) return 0

  const pointsInLevel = totalPoint - currentThreshold.requiredPoints
  const pointsNeeded =
    nextThreshold.requiredPoints - currentThreshold.requiredPoints

  return Math.min(100, Math.floor((pointsInLevel / pointsNeeded) * 100))
}
