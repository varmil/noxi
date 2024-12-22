import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function StreamTrendsTableHeader({}: Props) {
  const t = await getTranslations('Features.streamRanking')

  return (
    <TableHeader className="text-xs">
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap">Top 3</TableHead>

        {/* Thumbnail */}
        <TableHead className="" />

        {/* Title */}
        <TableHead className="text-nowrap">{t('streamTitle')}</TableHead>

        {/* 同接数 */}
        <TableHead className="text-nowrap text-center">
          {t('viewers')}
        </TableHead>

        {/* 日付 */}
        <TableHead className="text-nowrap text-center">{t('date')}</TableHead>
      </TableRow>
    </TableHeader>
  )
}
