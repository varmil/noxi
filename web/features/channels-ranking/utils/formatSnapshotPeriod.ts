import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'
import { isSnapshotPeriod, parseSnapshotPeriod } from './gallery-params'

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
    // YYYY-Wxx → 2026年第1週 / Week 1, 2026
    const weekMatch = target.match(/^(\d{4})-W(\d{2})$/)
    if (weekMatch) {
      const year = weekMatch[1]
      const week = parseInt(weekMatch[2], 10)
      return locale === 'ja'
        ? `${year}年第${week}週`
        : `Week ${week}, ${year}`
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
