import dayjs from 'lib/dayjs'
import { MonthlySnapshotPeriod } from 'types/period'

export type MonthlyPeriod = {
  period: MonthlySnapshotPeriod
  target: string // YYYY-MM
  year: number
  month: number
}

/**
 * 2025/01 から直前の完了した月までの月間期間一覧を生成
 * 新しい順に返す
 */
export function generateMonthlyPeriods(): MonthlyPeriod[] {
  const START_YEAR = 2025
  const START_MONTH = 1
  const now = dayjs().tz('Asia/Tokyo')

  // 直前の完了した月 = 現在の月の前月の最終日
  const lastCompletedMonthEnd = now.startOf('month').subtract(1, 'day')

  const periods: MonthlyPeriod[] = []
  let current = dayjs(`${START_YEAR}-${String(START_MONTH).padStart(2, '0')}-01`)

  while (
    current.isBefore(lastCompletedMonthEnd) ||
    current.isSame(lastCompletedMonthEnd.startOf('month'))
  ) {
    const year = current.year()
    const month = current.month() + 1
    const target = `${year}-${String(month).padStart(2, '0')}`

    periods.push({
      period: `monthly-${target}` as MonthlySnapshotPeriod,
      target,
      year,
      month
    })

    current = current.add(1, 'month')
  }

  return periods.reverse() // 新しい順
}
