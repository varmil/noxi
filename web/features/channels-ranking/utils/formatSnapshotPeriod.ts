import dayjs from 'lib/dayjs'
import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'
import {
  formatSnapshotPeriod as formatSnapshotPeriodUtil,
  isSnapshotPeriod,
  parseSnapshotPeriod
} from 'utils/period/snapshot-period'

// 後方互換性のため re-export
export { formatSnapshotPeriodUtil as formatSnapshotPeriod }

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
  const snapshotFormatted = formatSnapshotPeriodUtil(period, locale)
  if (snapshotFormatted) {
    return snapshotFormatted
  }
  return globalTranslations(`period.${period}`)
}
