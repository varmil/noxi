import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'

type Props = PropsWithoutRef<{
  dimension: StreamRankingDimension
}>

export default async function StreamRankingTableHeader({ dimension }: Props) {
  const t = await getTranslations('Features.streamRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Stream Thumbnail */}
        <TableHead className="" />

        {/* xs-md: Stream Title & Ch. Thumbnail & Ch. Title */}
        <TableHead className="@lg:hidden text-nowrap">
          {t('channel')} / {t('streamTitle')} / {t('viewers')}
        </TableHead>

        {/* lg-: Channel + Stream Title */}
        <TableHead className="hidden @lg:table-cell text-nowrap">
          {t('channel')} / {t('streamTitle')}
        </TableHead>

        {/* lg-: Viewers */}
        <TableHead className="hidden @lg:table-cell text-nowrap">
          {t('viewers')}
        </TableHead>

        {/* lg-: Supers */}
        <TableHead className="hidden @lg:table-cell text-nowrap">
          {t('supers')}
        </TableHead>

        {/* 3xl-: Group */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {t('group')}
        </TableHead>

        {/* 3xl-: Country */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {t('country')}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
