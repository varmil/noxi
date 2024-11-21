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
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

type Props = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: StreamRankingGroup
  country?: StreamRankingCountry
  compact?: boolean
}

export default async function StreamRankingGallery(
  props: PropsWithoutRef<Props>
) {
  const { period, dimension, compact } = props
  const t = await getTranslations('Features.streamRanking')
  const streams = await getStreams(createGetStreamsParams(props))

  return (
    <section className="@container space-y-4 sm:space-y-6">
      <StreamRankingTableTitle
        period={period}
        dimension={dimension}
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

function createGetStreamsParams({
  period,
  dimension,
  group,
  country,
  compact
}: Props): Parameters<typeof getStreams>[0] {
  let result = {}

  if (period === 'realtime') {
    result = { ...result, status: 'live' }
  }
  // TODO: 本当はliveもふくめたい
  else {
    let endedAfter: Date
    switch (period) {
      case 'daily':
        endedAfter = dayjs().subtract(1, 'day').toDate()
        break
      case 'weekly':
        endedAfter = dayjs().subtract(7, 'day').toDate()
        break
      case 'monthly':
        endedAfter = dayjs().subtract(1, 'month').toDate()
        break
      case 'yearly':
        endedAfter = dayjs().subtract(1, 'year').toDate()
        break
    }
    result = { ...result, status: 'ended', endedAfter }
  }

  if (dimension === 'concurrent-viewer') {
    result = {
      ...result,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }]
    }
  } else {
    // TODO: super chat
  }

  if (group) {
    result = { ...result, group }
  }

  if (country) {
    result = { ...result, country }
  }

  result = { ...result, limit: compact ? 5 : period === 'realtime' ? 100 : 30 }

  return result
}
