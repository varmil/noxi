import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function TopFansTableHeader({}: Props) {
  const feat = await getTranslations('Features.topFans')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Channel Thumbnail */}
        <TableHead className="text-center" />

        {/* Channel Title */}
        <TableHead className="">{feat('fan')} </TableHead>

        {/* dimension */}
        <TableHead className="text-nowrap text-right">
          {feat('usedCount')}
        </TableHead>

        {/* Link Icon */}
        <TableHead className="@3xl:hidden" />
      </TableRow>
    </TableHeader>
  )
}
