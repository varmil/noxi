import { PropsWithoutRef } from 'react'
import { getSupersSummariesCount } from 'apis/supers/getSupersSummaries'
import { getSupersSnapshotRankingCount } from 'apis/supers-snapshots/getRanking'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import {
  getChannelsParams,
  getSupersSnapshotCountParams,
  getSupersSummariesParams,
  isSnapshotPeriod
} from 'features/channels-ranking/utils/gallery-params'
import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'

type Props = {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group: string
  searchParams: ChannelsRankingSearchParams
}

export default async function IndexTemplate({
  period,
  dimension,
  group,
  searchParams
}: PropsWithoutRef<Props>) {
  const count = await getCount({ period, dimension, group, searchParams })

  async function getCount({
    period,
    dimension,
    group,
    searchParams
  }: Props): Promise<number> {
    if (dimension === 'subscriber') {
      return await getChannelsCount(
        getChannelsParams({ period, group, ...searchParams })
      )
    }

    // super-chat dimension
    if (isSnapshotPeriod(period)) {
      return await getSupersSnapshotRankingCount(
        getSupersSnapshotCountParams({
          period: period as SnapshotPeriod,
          group,
          ...searchParams
        })
      )
    }

    return await getSupersSummariesCount(
      getSupersSummariesParams({ period, group, ...searchParams })
    )
  }

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={dimension}
        />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <ChannelsRankingGallery
          className="max-w-6xl mx-auto"
          period={period}
          dimension={dimension}
          group={group}
          {...searchParams}
        />
        <ResponsivePagination
          totalPages={ChannelsRankingPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
