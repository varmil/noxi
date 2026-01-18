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
 * バッチ実行完了を考慮した「有効な現在時刻」を取得
 * バッチは日本時間 03:00 に実行され、03:30頃に完了する想定
 * 03:30より前は前日として扱うことで、未確定データへのリンク生成を防ぐ
 */
function getEffectiveNow(): dayjs.Dayjs {
  const now = dayjs().tz('Asia/Tokyo')
  const isBatchPending = now.hour() < 3 || (now.hour() === 3 && now.minute() < 30)
  return isBatchPending ? now.subtract(1, 'day') : now
}

/**
 * 2025/01/01 から直前の完了した週までの週間期間一覧を生成
 * ISO週番号を使用、新しい順に返す
 *
 * バッチ実行（日本時間 03:00〜03:30）を考慮し、
 * 03:30以降に新しい週のデータが表示される
 */
export function generateWeeklyPeriods(): WeeklyPeriod[] {
  const START_DATE = dayjs('2025-01-01').tz('Asia/Tokyo')
  const effectiveNow = getEffectiveNow()

  // 直前の完了した週 = 現在の週の前週の終わり
  const lastCompletedWeekEnd = effectiveNow.startOf('isoWeek').subtract(1, 'day')

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
