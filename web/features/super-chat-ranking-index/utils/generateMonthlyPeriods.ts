import dayjs from 'lib/dayjs'
import { MonthlySnapshotPeriod } from 'types/period'

export type MonthlyPeriod = {
  period: MonthlySnapshotPeriod
  target: string // YYYY-MM
  year: number
  month: number
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
 * 2025/01 から直前の完了した月までの月間期間一覧を生成
 * 新しい順に返す
 *
 * バッチ実行（日本時間 03:00〜03:30）を考慮し、
 * 03:30以降に新しい月のデータが表示される
 */
export function generateMonthlyPeriods(): MonthlyPeriod[] {
  const START_YEAR = 2025
  const START_MONTH = 1
  const effectiveNow = getEffectiveNow()

  // 直前の完了した月 = 現在の月の前月の最終日
  const lastCompletedMonthEnd = effectiveNow.startOf('month').subtract(1, 'day')

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
