import dayjs from 'lib/dayjs'
import { SnapshotPeriod } from 'types/period'

/**
 * 期間がスナップショット期間（weekly-xxx or monthly-xxx）かどうかを判定
 */
export function isSnapshotPeriod(period: string): period is SnapshotPeriod {
  return period.startsWith('weekly-') || period.startsWith('monthly-')
}

/**
 * スナップショット期間をパースしてAPIパラメータを取得
 */
export function parseSnapshotPeriod(period: SnapshotPeriod): {
  period: 'weekly' | 'monthly'
  target: string
} {
  if (period.startsWith('weekly-')) {
    return { period: 'weekly', target: period.slice(7) }
  }
  return { period: 'monthly', target: period.slice(8) }
}

/**
 * スナップショット期間から日付範囲を取得（JST ベース）
 */
export function getSnapshotDateRange(period: SnapshotPeriod): {
  start: Date
  end: Date
} {
  const { period: type, target } = parseSnapshotPeriod(period)

  if (type === 'weekly') {
    const weekMatch = target.match(/^(\d{4})-W(\d{2})$/)
    if (!weekMatch) throw new Error(`Invalid weekly period: ${period}`)
    const year = parseInt(weekMatch[1], 10)
    const week = parseInt(weekMatch[2], 10)
    const start = dayjs(`${year}-01-01`)
      .tz('Asia/Tokyo')
      .isoWeek(week)
      .startOf('isoWeek')
    const end = start.endOf('isoWeek')
    return { start: start.utc().toDate(), end: end.utc().toDate() }
  }

  if (type === 'monthly') {
    const monthMatch = target.match(/^(\d{4})-(\d{2})$/)
    if (!monthMatch) throw new Error(`Invalid monthly period: ${period}`)
    const year = parseInt(monthMatch[1], 10)
    const month = parseInt(monthMatch[2], 10) - 1
    const start = dayjs()
      .tz('Asia/Tokyo')
      .year(year)
      .month(month)
      .startOf('month')
    const end = start.endOf('month')
    return { start: start.utc().toDate(), end: end.utc().toDate() }
  }

  throw new Error(`Unknown period type: ${type}`)
}

/**
 * スナップショット期間を人間が読める形式にフォーマット
 * 非スナップショット期間の場合は undefined を返す
 */
export function formatSnapshotPeriod(
  period: string,
  locale: 'ja' | 'en'
): string | undefined {
  if (!isSnapshotPeriod(period)) {
    return undefined
  }

  const { period: type, target } = parseSnapshotPeriod(period)

  if (type === 'weekly') {
    const weekMatch = target.match(/^(\d{4})-W(\d{2})$/)
    if (weekMatch) {
      const year = parseInt(weekMatch[1], 10)
      const week = parseInt(weekMatch[2], 10)
      const start = dayjs(`${year}-01-01`).isoWeek(week).startOf('isoWeek')
      const end = start.endOf('isoWeek')
      const startStr = `${start.month() + 1}/${start.date()}`
      const endStr = `${end.month() + 1}/${end.date()}`
      const dateRange = `${startStr} ~ ${endStr}`
      return locale === 'ja'
        ? `${year}年第${week}週（${dateRange}）`
        : `Week ${week}, ${year} (${dateRange})`
    }
  }

  if (type === 'monthly') {
    const monthMatch = target.match(/^(\d{4})-(\d{2})$/)
    if (monthMatch) {
      const year = monthMatch[1]
      const month = parseInt(monthMatch[2], 10)
      if (locale === 'ja') {
        return `${year}年${month}月`
      } else {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
        return `${monthNames[month - 1]} ${year}`
      }
    }
  }

  return period
}

/**
 * 期間名を取得（スナップショットの場合はフォーマット、それ以外は翻訳キーを返す）
 *
 * @param period ランキング期間（ChannelsRankingPeriod, StreamRankingPeriod 両対応）
 * @param globalTranslations next-intl の翻訳関数
 * @param locale 'ja' | 'en'
 */
export function getPeriodDisplayName(
  period: string,
  globalTranslations: (key: string) => string,
  locale: 'ja' | 'en' = 'ja'
): string {
  const snapshotFormatted = formatSnapshotPeriod(period, locale)
  if (snapshotFormatted) {
    return snapshotFormatted
  }
  return globalTranslations(`period.${period}`)
}
