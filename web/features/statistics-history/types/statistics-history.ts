export type IntervalType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface StatisticsHistoryPoint {
  date: string
  total: number
  diff: number
}
