import { PropsWithoutRef } from 'react'
import { getSupersSummaries, getSupersSummariesCount } from 'apis/supers/getSupersSummaries'
import {
  getSupersSnapshotRanking,
  getSupersSnapshotRankingCount
} from 'apis/supers-snapshots/getRanking'
import { getChannels, getChannelsCount } from 'apis/youtube/getChannels'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import ChannelsRankingTable from 'features/channels-ranking/components/table/ChannelsRankingTable'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'
import { isSnapshotPeriod } from 'utils/period/snapshot-period'
import {
  getChannelsParams,
  getSupersSnapshotCountParams,
  getSupersSnapshotParams,
  getSupersSummariesParams
} from '../../utils/gallery-params'

export type ChannelsRankingGalleryProps = ChannelsRankingSearchParams & {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group: string
}

/**
 * 役割
 * Gallery：Orderを決める（ランキングの順番を決める）
 * Table  ：各列で表示する内容を決める（各列をfetchする）
 *
 * 両者で似たようなFetchになるのは許容する
 **/
export default async function ChannelsRankingGallery(
  props: PropsWithoutRef<ChannelsRankingGalleryProps>
) {
  let channelIds: string[] = []

  const { period, dimension, group, gender, date, page } = props

  let count = 0

  if (dimension === 'super-chat') {
    if (isSnapshotPeriod(period)) {
      // 週間・月間スナップショットランキング
      const [snapshots, snapshotCount] = await Promise.all([
        getSupersSnapshotRanking(getSupersSnapshotParams({ ...props, period })),
        getSupersSnapshotRankingCount(
          getSupersSnapshotCountParams({
            period: period as SnapshotPeriod,
            group,
            gender
          })
        )
      ])
      channelIds = snapshots.map(snapshot => snapshot.channelId)
      count = snapshotCount
    } else {
      // 通常のランキング
      const [supersSummaries, summariesCount] = await Promise.all([
        getSupersSummaries(getSupersSummariesParams(props)),
        getSupersSummariesCount(getSupersSummariesParams(props))
      ])
      channelIds = supersSummaries.map(summary => summary.channelId)
      count = summariesCount
    }
  }

  if (dimension === 'subscriber') {
    const [channels, channelsCount] = await Promise.all([
      getChannels(getChannelsParams(props)),
      getChannelsCount(getChannelsParams(props))
    ])
    channelIds = channels.map(channel => channel.basicInfo.id)
    count = channelsCount
  }

  return (
    <>
      <ChannelsRankingTable
        channelIds={channelIds}
        dimension={dimension}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

      <ResponsivePagination
        totalPages={ChannelsRankingPagination.getTotalPages(count)}
      />
    </>
  )
}
