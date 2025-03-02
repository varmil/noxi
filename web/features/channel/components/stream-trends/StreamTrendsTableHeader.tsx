import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function StreamTrendsTableHeader({}: Props) {
  const feat = await getTranslations('Features.streamRanking')

  return (
    <TableHeader className="text-xs">
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap">Top 3</TableHead>

        {/* Thumbnail */}
        <TableHead className="" />

        {/* Title */}
        <TableHead className="text-nowrap">{feat('streamTitle')}</TableHead>

        {/* 同接数 */}
        <TableHead className="text-nowrap text-center">
          {feat('viewers')}
        </TableHead>

        {/* 日付 */}
        <TableHead className="text-nowrap text-center">
          {feat('date')}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
