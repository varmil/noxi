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
export function roundDateToHour(date: undefined): undefined
export function roundDateToHour(date: null): null
export function roundDateToHour(date: Date): Date
export function roundDateToHour(date: Date | undefined): Date | undefined
export function roundDateToHour(date: Date | null): Date | null
export function roundDateToHour(
  date: Date | null | undefined
): Date | null | undefined
export function roundDateToHour(
  date: Date | null | undefined
): Date | null | undefined {
  if (date === null || date === undefined) return date
  return new Date(roundISOString(date.toISOString(), 'hour'))
}

/**
 * 日付を日単位に丸める（キャッシュヒット率向上のため）
 */
export function roundDateToDay(date: undefined): undefined
export function roundDateToDay(date: null): null
export function roundDateToDay(date: Date): Date
export function roundDateToDay(date: Date | undefined): Date | undefined
export function roundDateToDay(date: Date | null): Date | null
export function roundDateToDay(
  date: Date | null | undefined
): Date | null | undefined
export function roundDateToDay(
  date: Date | null | undefined
): Date | null | undefined {
  if (date === null || date === undefined) return date
  return new Date(roundISOString(date.toISOString(), 'day'))
}
