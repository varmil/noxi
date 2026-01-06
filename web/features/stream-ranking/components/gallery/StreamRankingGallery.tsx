import { PropsWithoutRef } from 'react'
import { getGroupName } from 'apis/groups'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { PageXSPX } from 'components/page'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import createGetStreamsParams from 'features/stream-ranking/utils/createGetStreamsParams'
import createGetSupersBundlesParams from 'features/stream-ranking/utils/createGetSupersBundlesParams'
import { CACHE_10M } from 'lib/fetchAPI'
import { StreamRankingPeriod } from 'types/period'

export type StreamRankingGalleryProps = StreamRankingSearchParams & {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group: string
  className?: string
}

export default async function StreamRankingGallery(
  props: PropsWithoutRef<StreamRankingGalleryProps>
) {
  const { period, dimension, group, gender, page, className } = props

  const groupName = await getGroupName(group, {
    errorContext: 'stream ranking gallery'
  })

  let streams: StreamsSchema = []

  if (dimension === 'super-chat') {
    /**
     * bundle --> stream を取得する
     * sortが崩れる（bundleの方の順番を使う必要がある）ので
     * streamsを取得後に手動で並び替えする
     */
    const bundles = await getSupersBundles(createGetSupersBundlesParams(props))
    streams = (
      await getStreams({
        videoIds: bundles.map(bundle => bundle.videoId),
        limit: bundles.length,
        revalidate: CACHE_10M
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
        groupName={groupName}
        gender={gender}
        className={`${PageXSPX} sm:px-0`}
      />

      <StreamRankingTable
        dimension={dimension}
        group={group}
        page={Number(page) || 1}
        streams={streams}
      />

    </section>
  )
}
