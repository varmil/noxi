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
import type { StatisticsHistoryPoint } from '../types/statistics-history'

interface Props {
  data: StatisticsHistoryPoint[]
  labels: { date: string; total: string; diff: string }
  totalLabel: string
}

export function StatisticsHistoryTable({
  data,
  labels,
  totalLabel
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
      <TableBody>
        <TableRow className="font-medium">
          <TableCell>{totalLabel}</TableCell>
          <TableCell className="text-right">
            <DiffDisplay value={totalDiff} format={format} />
          </TableCell>
          <TableCell className="text-right">-</TableCell>
        </TableRow>
        {[...data].reverse().map(point => (
          <TableRow key={point.date}>
            <TableCell>{point.date}</TableCell>
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
