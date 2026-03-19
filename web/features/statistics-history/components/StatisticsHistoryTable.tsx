'use client'

import { useFormatter } from 'next-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type {
  IntervalType,
  StatisticsHistoryPoint
} from '../types/statistics-history'

interface Props {
  data: StatisticsHistoryPoint[]
  labels: { date: string; total: string; diff: string }
  totalLabel: string
  interval: IntervalType
}

export function StatisticsHistoryTable({
  data,
  labels,
  totalLabel,
  interval
}: Props) {
  const format = useFormatter()

  const totalDiff = data.reduce((acc, d) => acc + d.diff, 0)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">{labels.date}</TableHead>
          <TableHead className="text-right">{labels.diff}</TableHead>
          <TableHead className="text-right">{labels.total}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-mono">
        <TableRow className="font-bold">
          <TableCell>{totalLabel}</TableCell>
          <TableCell className="text-right">
            <DiffDisplay value={totalDiff} format={format} />
          </TableCell>
          <TableCell className="text-right">-</TableCell>
        </TableRow>
        {[...data].reverse().map(point => (
          <TableRow key={point.date}>
            <TableCell>
              <DateLabel
                date={point.date}
                interval={interval}
                format={format}
              />
            </TableCell>
            <TableCell className="text-right">
              <DiffDisplay value={point.diff} format={format} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {format.number(point.total)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function DateLabel({
  date,
  interval,
  format
}: {
  date: string
  interval: IntervalType
  format: ReturnType<typeof useFormatter>
}) {
  const d = new Date(date)
  switch (interval) {
    case 'yearly':
      return format.dateTime(d, { year: 'numeric' })
    case 'monthly':
      return format.dateTime(d, { year: 'numeric', month: 'long' })
    case 'weekly': {
      const end = new Date(d)
      end.setDate(end.getDate() + 6)
      return `${format.dateTime(d, { year: 'numeric', month: 'numeric', day: '2-digit' })} ~ ${format.dateTime(end, { year: 'numeric', month: 'numeric', day: 'numeric' })}`
    }
    case 'daily':
    default:
      return format.dateTime(d, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
  }
}

function DiffDisplay({
  value,
  format
}: {
  value: number
  format: ReturnType<typeof useFormatter>
}) {
  if (value === 0) return <span className="text-muted-foreground">-</span>

  const color = value > 0 ? 'text-green-600' : 'text-red-500'
  const prefix = value > 0 ? '+' : ''

  return (
    <span className={`tabular-nums ${color}`}>
      {prefix}
      {format.number(value)}
    </span>
  )
}
