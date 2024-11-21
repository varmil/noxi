import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getStreams } from 'apis/youtube/getStreams'
import { PageXSPX } from 'components/page'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'
import {
  StreamRankingCountry,
  StreamRankingDimension,
  StreamRankingGroup,
  StreamRankingPeriod
} from 'features/stream-ranking/types/stream-ranking.type'
import { Link } from 'lib/navigation'

type Props = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: StreamRankingGroup
  country?: StreamRankingCountry
  compact?: boolean
}

export default async function StreamRankingGallery({
  compact
}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Features.streamRanking')

  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: compact ? 5 : 100
  })

  return (
    <section className="@container space-y-4 sm:space-y-6">
      <StreamRankingTableTitle
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      <StreamRankingTable streams={streams} />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href="/youtube/live">
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
