import dayjs from 'lib/dayjs'

/**
 * ISO String を指定した粒度に丸める
 * キャッシュヒット率を高めるために使用
 */
function roundISOString(
  isoString: string,
  unit: 'hour' | 'day' | 'week'
): string {
  return dayjs(isoString).startOf(unit).toISOString()
}

/**
 * 日付を10分単位に丸める（キャッシュヒット率向上のため）
 * 例: 12:37 → 12:30, 12:43 → 12:40
 */
export function roundDateTo10Minutes(date: undefined): undefined
export function roundDateTo10Minutes(date: null): null
export function roundDateTo10Minutes(date: Date): Date
export function roundDateTo10Minutes(date: Date | undefined): Date | undefined
export function roundDateTo10Minutes(date: Date | null): Date | null
export function roundDateTo10Minutes(
  date: Date | null | undefined
): Date | null | undefined
export function roundDateTo10Minutes(
  date: Date | null | undefined
): Date | null | undefined {
  if (date === null || date === undefined) return date
  const ms = date.getTime()
  const tenMinutesMs = 10 * 60 * 1000
  return new Date(Math.floor(ms / tenMinutesMs) * tenMinutesMs)
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

/**
 * 日付を週単位に丸める（キャッシュヒット率向上のため）
 */
export function roundDateToWeek(date: undefined): undefined
export function roundDateToWeek(date: null): null
export function roundDateToWeek(date: Date): Date
export function roundDateToWeek(date: Date | undefined): Date | undefined
export function roundDateToWeek(date: Date | null): Date | null
export function roundDateToWeek(
  date: Date | null | undefined
): Date | null | undefined
export function roundDateToWeek(
  date: Date | null | undefined
): Date | null | undefined {
  if (date === null || date === undefined) return date
  return new Date(roundISOString(date.toISOString(), 'week'))
}
