import dayjs from 'lib/dayjs'
import { WeeklySnapshotPeriod } from 'types/period'

export type WeeklyPeriod = {
  period: WeeklySnapshotPeriod
  target: string // YYYY-Wxx
  year: number
  week: number
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
}

/**
 * 2025/01/01 から直前の完了した週までの週間期間一覧を生成
 * ISO週番号を使用、新しい順に返す
 */
export function generateWeeklyPeriods(): WeeklyPeriod[] {
  const START_DATE = dayjs('2025-01-01').tz('Asia/Tokyo')
  const now = dayjs().tz('Asia/Tokyo')

  // 直前の完了した週 = 現在の週の前週の終わり
  const lastCompletedWeekEnd = now.startOf('isoWeek').subtract(1, 'day')

  const periods: WeeklyPeriod[] = []
  let current = START_DATE.startOf('isoWeek')

  while (
    current.isBefore(lastCompletedWeekEnd) ||
    current.isSame(lastCompletedWeekEnd.startOf('isoWeek'))
  ) {
    const year = current.isoWeekYear()
    const week = current.isoWeek()
    const target = `${year}-W${String(week).padStart(2, '0')}`

    periods.push({
      period: `weekly-${target}` as WeeklySnapshotPeriod,
      target,
      year,
      week,
      startDate: current.clone(),
      endDate: current.endOf('isoWeek')
    })

    current = current.add(1, 'week')
  }

  return periods.reverse() // 新しい順
}
