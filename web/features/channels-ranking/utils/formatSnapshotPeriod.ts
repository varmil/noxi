import dayjs from 'lib/dayjs'
import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'
import { isSnapshotPeriod, parseSnapshotPeriod } from './gallery-params'

/**
 * ISO週番号から週の開始日（月曜）と終了日（日曜）を計算
 */
function getWeekDateRange(
  year: number,
  week: number
): { start: dayjs.Dayjs; end: dayjs.Dayjs } {
  // その年の1月1日からISO週を設定
  const start = dayjs(`${year}-01-01`).isoWeek(week).startOf('isoWeek')
  const end = start.endOf('isoWeek')
  return { start, end }
}

/**
 * スナップショット期間を人間が読める形式にフォーマット
 *
 * @param period ランキング期間
 * @param locale 'ja' | 'en'
 * @returns フォーマットされた文字列（スナップショット以外は undefined）
 */
export function formatSnapshotPeriod(
  period: ChannelsRankingPeriod,
  locale: 'ja' | 'en' = 'ja'
): string | undefined {
  if (!isSnapshotPeriod(period)) {
    return undefined
  }

  const { period: type, target } = parseSnapshotPeriod(period as SnapshotPeriod)

  if (type === 'weekly') {
    // YYYY-Wxx → 2026年第1週（1/6 ~ 1/12） / Week 1, 2026 (1/6 ~ 1/12)
    const weekMatch = target.match(/^(\d{4})-W(\d{2})$/)
    if (weekMatch) {
      const year = parseInt(weekMatch[1], 10)
      const week = parseInt(weekMatch[2], 10)
      const { start, end } = getWeekDateRange(year, week)
      const startStr = `${start.month() + 1}/${start.date()}`
      const endStr = `${end.month() + 1}/${end.date()}`
      const dateRange = `${startStr} ~ ${endStr}`

      return locale === 'ja'
        ? `${year}年第${week}週（${dateRange}）`
        : `Week ${week}, ${year} (${dateRange})`
    }
  }

  if (type === 'monthly') {
    // YYYY-MM → 2025年7月 / July 2025
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

  return undefined
}

/**
 * 週間スナップショット期間をタイトルとサブタイトルに分けてフォーマット
 * PeriodCard用: タイトル「2025年第48週」、サブタイトル「11/24 ~ 11/30」
 *
 * @param period ランキング期間（weekly-YYYY-Wxx形式）
 * @param locale 'ja' | 'en'
 * @returns { title, subtitle } または undefined
 */
export function formatWeeklyPeriodSplit(
  period: ChannelsRankingPeriod,
  locale: 'ja' | 'en' = 'ja'
): { title: string; subtitle: string } | undefined {
  if (!isSnapshotPeriod(period)) {
    return undefined
  }

  const { period: type, target } = parseSnapshotPeriod(period as SnapshotPeriod)

  if (type !== 'weekly') {
    return undefined
  }

  const weekMatch = target.match(/^(\d{4})-W(\d{2})$/)
  if (!weekMatch) {
    return undefined
  }

  const year = parseInt(weekMatch[1], 10)
  const week = parseInt(weekMatch[2], 10)
  const { start, end } = getWeekDateRange(year, week)
  const startStr = `${start.month() + 1}/${start.date()}`
  const endStr = `${end.month() + 1}/${end.date()}`

  return {
    title: locale === 'ja' ? `${year}年第${week}週` : `Week ${week}, ${year}`,
    subtitle: `${startStr} ~ ${endStr}`
  }
}

/**
 * 期間名を取得（スナップショットの場合はフォーマット、それ以外は翻訳キーを返す）
 *
 * @param period ランキング期間
 * @param globalTranslations next-intl の翻訳関数
 * @param locale 'ja' | 'en'
 */
export function getPeriodDisplayName(
  period: ChannelsRankingPeriod,
  globalTranslations: (key: string) => string,
  locale: 'ja' | 'en' = 'ja'
): string {
  const snapshotFormatted = formatSnapshotPeriod(period, locale)
  if (snapshotFormatted) {
    return snapshotFormatted
  }
  return globalTranslations(`period.${period}`)
}
