import { PropsWithoutRef } from 'react'
import { getGroupName } from 'apis/groups'
import { getSupersSummaries } from 'apis/supers/getSupersSummaries'
import { getSupersSnapshotRanking } from 'apis/supers-snapshots/getRanking'
import { getChannels } from 'apis/youtube/getChannels'
import { PageXSPX } from 'components/page'
import ChannelsRankingTable from 'features/channels-ranking/components/table/ChannelsRankingTable'
import ChannelsRankingTableTitle from 'features/channels-ranking/components/table/ChannelsRankingTableTitle'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { ChannelsRankingPeriod } from 'types/period'
import {
  getChannelsParams,
  getSupersSnapshotParams,
  getSupersSummariesParams,
  isSnapshotPeriod
} from '../../utils/gallery-params'

export type ChannelsRankingGalleryProps = ChannelsRankingSearchParams & {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group: string
  className?: string
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

  const { period, dimension, group, gender, date, page, className } = props

  const groupName = await getGroupName(group, {
    errorContext: 'channels ranking gallery'
  })

  if (dimension === 'super-chat') {
    if (isSnapshotPeriod(period)) {
      // 週間・月間スナップショットランキング
      const snapshots = await getSupersSnapshotRanking(
        getSupersSnapshotParams({ ...props, period })
      )
      channelIds = snapshots.map(snapshot => snapshot.channelId)
    } else {
      // 通常のランキング
      const supersSummaries = await getSupersSummaries(
        getSupersSummariesParams(props)
      )
      channelIds = supersSummaries.map(summary => summary.channelId)
    }
  }

  if (dimension === 'subscriber') {
    const channels = await getChannels(getChannelsParams(props))
    channelIds = channels.map(channel => channel.basicInfo.id)
  }

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <ChannelsRankingTableTitle
        dimension={dimension}
        period={period}
        groupName={groupName}
        gender={gender}
        date={date ? new Date(date) : undefined}
        className={`${PageXSPX} sm:px-0`}
      />

      <ChannelsRankingTable
        channelIds={channelIds}
        dimension={dimension}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

    </section>
  )
}
