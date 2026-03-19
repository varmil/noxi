'use client'

import { startTransition, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from 'lib/navigation'
import { IntervalType } from '../types/statistics-history'

const DEFAULT_INTERVAL: IntervalType = 'daily'
const DEFAULT_DAYS = 90

export function useStatisticsHistoryParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const interval = (searchParams.get('interval') as IntervalType) || DEFAULT_INTERVAL
  const start = searchParams.get('start') || defaultStart()
  const end = searchParams.get('end') || defaultEnd()

  const setParams = useCallback(
    (params: { interval?: IntervalType; start?: string; end?: string }) => {
      const newParams = new URLSearchParams(searchParams.toString())
      if (params.interval) newParams.set('interval', params.interval)
      if (params.start) newParams.set('start', params.start)
      if (params.end) newParams.set('end', params.end)
      startTransition(() => {
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
      })
    },
    [searchParams, router, pathname]
  )

  const gte = useMemo(() => toJSTStartOfDay(new Date(start)), [start])
  const lt = useMemo(() => toJSTNextDay(new Date(end)), [end])

  return { interval, start, end, gte, lt, setParams }
}

function defaultEnd(): string {
  return formatDate(new Date())
}

function defaultStart(): string {
  const d = new Date()
  d.setDate(d.getDate() - DEFAULT_DAYS)
  return formatDate(d)
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** JST 00:00:00 = UTC 前日 15:00:00 */
function toJSTStartOfDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), -9)
  )
}

/** JST 翌日 00:00:00 = lt として使用 */
function toJSTNextDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 1, -9)
  )
}
