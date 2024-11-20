import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

type Props = PropsWithoutRef<{}>

export default async function StreamRankingTableHeader({}: Props) {
  const t = await getTranslations('Features.streamRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Stream Thumbnail */}
        <TableHead className="" />

        {/* Stream Title & Ch. Thumbnail & Ch. Title */}
        <TableHead className="@lg:hidden text-nowrap">
          {t('streamTitle')} / {t('viewers')} / {t('channel')}
        </TableHead>
        <TableHead className="hidden @lg:table-cell text-nowrap">
          {t('streamTitle')}
        </TableHead>

        {/* lg-: Viewers */}
        <TableHead className="hidden @lg:table-cell text-nowrap">
          {t('viewers')}
        </TableHead>

        {/* lg-: Channel */}
        <TableHead className="hidden @lg:table-cell text-nowrap text-center">
          {t('channel')}
        </TableHead>

        {/* lg-: Group */}
        <TableHead className="hidden @lg:table-cell text-nowrap text-center">
          {t('group')}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
