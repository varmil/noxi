import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function StreamRankingTableHeader({}: Props) {
  const t = await getTranslations('Features.streamRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Flag */}
        <TableHead className="p-0 sm:p-2" />
        {/* Ch. Thumbnail */}
        <TableHead />
        {/* Ch. Title */}
        <TableHead className="text-nowrap">{t('channel')}</TableHead>
        {/* Viewers */}
        <TableHead className="text-nowrap">{t('viewers')}</TableHead>
        {/* Stream Thumbnail */}
        <TableHead className="hidden @lg:table-cell"></TableHead>
        {/* Stream Title */}
        <TableHead className="text-nowrap">{t('streamTitle')}</TableHead>
        {/* Group */}
        <TableHead className="text-nowrap text-center">{t('group')}</TableHead>
      </TableRow>
    </TableHeader>
  )
}
