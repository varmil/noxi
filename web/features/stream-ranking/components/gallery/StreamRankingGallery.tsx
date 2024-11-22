import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getStreams } from 'apis/youtube/getStreams'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { PageXSPX } from 'components/page'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'
import {
  StreamRankingCountry,
  StreamRankingDimension,
  StreamRankingGroup,
  StreamRankingPeriod
} from 'features/stream-ranking/types/stream-ranking.type'
import createGetStreamsParams from 'features/stream-ranking/utils/createGetStreamsParams'
import createGetSupersBundlesParams from 'features/stream-ranking/utils/createGetSupersBundlesParams'
import { Link } from 'lib/navigation'

export type StreamRankingGalleryProps = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group?: StreamRankingGroup
  country?: StreamRankingCountry
  compact?: boolean
  className?: string
}

export default async function StreamRankingGallery(
  props: PropsWithoutRef<StreamRankingGalleryProps>
) {
  const t = await getTranslations('Features.streamRanking')

  let streams: StreamsSchema = []
  const { period, dimension, compact, className } = props

  if (dimension === 'super-chat') {
    /**
     * bundle --> stream を取得する
     * sortが崩れる（bundleの方の順番を使う必要がある）ので
     * streamsを取得後に手動で並び替えする
     */
    const bundles = await getSupersBundles(createGetSupersBundlesParams(props))
    streams = (
      await getStreams({
        videoIds: bundles.map(bundle => bundle.videoId)
      })
    ).sort((a, b) => {
      const aIndex = bundles.findIndex(bundle => bundle.videoId === a.videoId)
      const bIndex = bundles.findIndex(bundle => bundle.videoId === b.videoId)
      return aIndex - bIndex
    })
  } else {
    /**
     * 直接 stream を取得する
     */
    streams = await getStreams(createGetStreamsParams(props))
  }

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <StreamRankingTableTitle
        period={period}
        dimension={dimension}
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      <StreamRankingTable dimension={dimension} streams={streams} />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href="/youtube/ranking/live">
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
