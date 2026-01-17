import { PropsWithoutRef } from 'react'
import { getGroupName } from 'apis/groups'
import { getSupersBundles, getSupersBundlesCount } from 'apis/supers/getSupersBundles'
import { getStreams, getStreamsCount } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { PageXSPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { StreamRankingPagination } from 'config/constants/Pagination'
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

  // Client Component に渡す日時を Server Component で確定させてハイドレーションエラーを防ぐ
  const titleDate = new Date().toISOString()

  const groupName = await getGroupName(group, {
    errorContext: 'stream ranking gallery'
  })

  let streams: StreamsSchema = []
  let count = 0

  if (dimension === 'super-chat') {
    /**
     * bundle --> stream を取得する
     * sortが崩れる（bundleの方の順番を使う必要がある）ので
     * streamsを取得後に手動で並び替えする
     */
    const [bundles, bundlesCount] = await Promise.all([
      getSupersBundles(createGetSupersBundlesParams(props)),
      getSupersBundlesCount(createGetSupersBundlesParams(props))
    ])
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
    count = bundlesCount
  } else {
    /**
     * 直接 stream を取得する
     */
    const [streamsData, streamsCount] = await Promise.all([
      getStreams(createGetStreamsParams(props)),
      getStreamsCount(createGetStreamsParams(props))
    ])
    streams = streamsData
    count = streamsCount
  }

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <StreamRankingTableTitle
        period={period}
        dimension={dimension}
        groupName={groupName}
        gender={gender}
        date={titleDate}
        className={`${PageXSPX} sm:px-0`}
      />

      <StreamRankingTable
        dimension={dimension}
        group={group}
        page={Number(page) || 1}
        streams={streams}
      />

      <ResponsivePagination
        totalPages={StreamRankingPagination.getTotalPages(count)}
      />
    </section>
  )
}
