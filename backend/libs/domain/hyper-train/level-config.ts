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

export const TRAIN_DURATION_MINUTES = 60
export const TRAIN_MAX_DURATION_HOURS = 6
export const TRAIN_COOLDOWN_HOURS = 1
export const TRAIN_TRIGGER_UNIQUE_USERS = 7
export const TRAIN_TRIGGER_WINDOW_MINUTES = 60
export const FREE_TICKET_POINT = 100

export function calculateLevel(totalPoint: number): number {
  let level = 1
  for (const t of HYPER_TRAIN_LEVEL_THRESHOLDS) {
    if (totalPoint >= t.requiredPoints) level = t.level
  }
  return level
}
