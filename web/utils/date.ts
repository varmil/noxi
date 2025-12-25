import dayjs from 'lib/dayjs'

/**
 * ISO String を指定した粒度に丸める
 * キャッシュヒット率を高めるために使用
 */
function roundISOString(isoString: string, unit: 'hour' | 'day'): string {
  return dayjs(isoString).startOf(unit).toISOString()
}

/**
 * 日付を時間単位に丸める（キャッシュヒット率向上のため）
 */
export function roundDateToHour(
  date: Date | null | undefined
): Date | null | undefined {
  if (date === null || date === undefined) return date
  return new Date(roundISOString(date.toISOString(), 'hour'))
}
