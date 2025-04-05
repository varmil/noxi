import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'

type Props = PropsWithoutRef<{
  dimension: ChannelsRankingDimension
}>

export default async function ChannelsRankingTableHeader({ dimension }: Props) {
  const supers = await getTranslations('Features.supers')
  const channels = await getTranslations('Features.channelsRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Channel Thumbnail */}
        <TableHead className="text-center" />

        {/* Channel Title */}
        <TableHead className="">{channels('channel')} </TableHead>

        {/* Supers */}
        {dimension === 'super-chat' && (
          <TableHead className="text-nowrap text-right">
            {supers('label')}
          </TableHead>
        )}

        {/* Subscribers */}
        {dimension === 'subscriber' && (
          <TableHead className="text-nowrap text-right">
            {channels('subscribers')}
          </TableHead>
        )}

        {/* 3xl-: Group */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {channels('group')}
        </TableHead>

        {/* 3xl-: Country */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {channels('country')}
        </TableHead>

        {/* Link Icon */}
        <TableHead className="@3xl:hidden" />
      </TableRow>
    </TableHeader>
  )
}
