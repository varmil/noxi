export function formatNumber(n: number): string {
  return n.toLocaleString('ja-JP')
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(2)}%`
}

export function formatViewCount(n: number): string {
  if (n >= 100_000_000) {
    return `${(n / 100_000_000).toFixed(1)}億`
  }
  if (n >= 10_000) {
    return `${Math.round(n / 10_000).toLocaleString('ja-JP')}万`
  }
  return n.toLocaleString('ja-JP')
}

export function truncateTitle(title: string, maxLength: number = 16): string {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '…'
  }
  return title
}

export function getWeeklyDateRangeLabel(): string {
  const now = new Date()
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const year = jstNow.getUTCFullYear()
  const month = jstNow.getUTCMonth()
  const day = jstNow.getUTCDate()

  const lt = new Date(Date.UTC(year, month, day, -9))
  const gte = new Date(Date.UTC(year, month, day - 7, -9))

  const startJst = new Date(gte.getTime() + 9 * 60 * 60 * 1000)
  const endJst = new Date(lt.getTime() + (9 - 24) * 60 * 60 * 1000)

  const startStr = `${startJst.getUTCMonth() + 1}/${startJst.getUTCDate()}`
  const endStr = `${endJst.getUTCMonth() + 1}/${endJst.getUTCDate()}`

  return `${startStr}〜${endStr}`
}

export function getPreviousMonthLabel(): string {
  const now = new Date()
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const year = jstNow.getUTCFullYear()
  const month = jstNow.getUTCMonth()

  const prevYear = month === 0 ? year - 1 : year
  const prevMonth = month === 0 ? 11 : month - 1

  return `${prevYear}年${prevMonth + 1}月`
}
