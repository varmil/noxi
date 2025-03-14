import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'

type Props = PropsWithoutRef<{
  dimension: StreamRankingDimension
}>

export default async function StreamRankingTableHeader({ dimension }: Props) {
  const stream = await getTranslations('Features.streamRanking')
  const channels = await getTranslations('Features.channelsRanking')

  return (
    <TableHeader>
      <TableRow>
        {/* Rank */}
        <TableHead className="w-0 text-nowrap"></TableHead>

        {/* Channel Thumbnail */}
        <TableHead className="text-center" />

        {/* Channel Title */}
        <TableHead className="">{channels('channel')}</TableHead>

        {/* xs-md: Concurrent Viewers */}
        {dimension === 'concurrent-viewer' && (
          <TableHead className="text-nowrap">{stream('viewers')}</TableHead>
        )}

        {/*  xs- md: Supers */}
        {dimension === 'super-chat' && (
          <TableHead className="text-nowrap">{stream('supers')}</TableHead>
        )}

        {/* Stream Thumbnail */}
        <TableHead className="" />

        {/* Stream Title */}
        <TableHead className="text-nowrap">{stream('streamTitle')}</TableHead>

        {/* lg-: Viewers */}
        {/* <TableHead className="hidden @lg:table-cell text-nowrap">
          {stream('viewers')}
        </TableHead> */}

        {/* lg-: Supers */}
        {/* <TableHead className="hidden @lg:table-cell text-nowrap">
          {stream('supers')}
        </TableHead> */}

        {/* 3xl-: Group */}
        <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
          {stream('group')}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
