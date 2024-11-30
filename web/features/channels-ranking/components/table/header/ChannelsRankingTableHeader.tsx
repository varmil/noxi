import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'

type Props = PropsWithoutRef<{
  dimension: ChannelsRankingDimension
}>

export default async function ChannelsRankingTableHeader({ dimension }: Props) {
  const t = await getTranslations('Features.channelsRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Channel Thumbnail */}
        <TableHead className="" />

        {/* Channel Title */}
        <TableHead className="">{t('channel')} </TableHead>

        {/* Supers */}
        <TableHead className="text-nowrap">{t('supers')}</TableHead>

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
