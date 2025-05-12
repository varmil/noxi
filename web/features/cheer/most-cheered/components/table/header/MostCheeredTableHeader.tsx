import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function MostCheeredTableHeader({}: Props) {
  const feat = await getTranslations('Features.mostCheered')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Channel Thumbnail */}
        <TableHead className="text-center" />

        {/* Channel Title */}
        <TableHead className="">{feat('channel')} </TableHead>

        {/* dimension */}
        <TableHead className="text-nowrap text-right">
          {feat('usedCount')}
        </TableHead>

        {/* 3xl-: Group */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {feat('group')}
        </TableHead>

        {/* 3xl-: Country */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {feat('country')}
        </TableHead>

        {/* Link Icon */}
        <TableHead className="@3xl:hidden" />
      </TableRow>
    </TableHeader>
  )
}
