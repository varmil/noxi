'use client'

import { useTranslations } from 'next-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { COMPARISON_TABLE_DATA } from '../../constants/demoData'

export default function ComparisonAnswer() {
  const t = useTranslations('Features.aiDemo')

  return (
    <div className="mt-3 space-y-2">
      <p className="text-sm font-medium">{t('charts.comparisonTitle')}</p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('charts.metric')}</TableHead>
              <TableHead className="text-right">
                {t('charts.groupA')}
              </TableHead>
              <TableHead className="text-right">
                {t('charts.groupB')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPARISON_TABLE_DATA.map(row => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">
                  {t(
                    `charts.comparisonLabels.${row.label}` as `charts.comparisonLabels.${typeof row.label}`
                  )}
                </TableCell>
                <TableCell className="text-right">{row.groupA}</TableCell>
                <TableCell className="text-right">{row.groupB}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
