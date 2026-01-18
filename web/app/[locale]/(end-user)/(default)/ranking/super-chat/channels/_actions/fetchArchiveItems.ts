'use server'

import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import { formatSnapshotPeriod } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import { getSnapshotSupersRanking } from 'features/channels-ranking/utils/getSnapshotSupersRanking'
import { generateMonthlyPeriods } from 'features/super-chat-ranking-index/utils/generateMonthlyPeriods'
import { generateWeeklyPeriods } from 'features/super-chat-ranking-index/utils/generateWeeklyPeriods'
import {
  MonthlySnapshotPeriod,
  WeeklySnapshotPeriod
} from 'types/period'

export type ArchiveItem = {
  id: string
  title: string
  href: string
  channels: {
    id: string
    title: string
    thumbnailUrl: string | undefined
  }[]
}

export type FetchArchiveItemsResult = {
  items: ArchiveItem[]
  hasMore: boolean
  totalCount: number
}

type PeriodBase = {
  period: string
  target: string
}

/**
 * 週間または月間のアーカイブアイテムを取得する Server Action
 *
 * @param type - 'weekly' または 'monthly'
 * @param group - グループID（'all' で全グループ）
 * @param locale - ロケール
 * @param offset - 取得開始位置
 * @param limit - 取得件数
 */
export async function fetchArchiveItems(
  type: 'weekly' | 'monthly',
  group: string,
  locale: 'ja' | 'en',
  offset: number,
  limit: number
): Promise<FetchArchiveItemsResult> {
  const periods: PeriodBase[] =
    type === 'weekly' ? generateWeeklyPeriods() : generateMonthlyPeriods()

  const totalCount = periods.length
  const slicedPeriods = periods.slice(offset, offset + limit)

  const items = await fetchTop5ForPeriods(slicedPeriods, type, group, locale)

  return {
    items,
    hasMore: offset + limit < totalCount,
    totalCount
  }
}

async function fetchTop5ForPeriods(
  periods: PeriodBase[],
  periodType: 'weekly' | 'monthly',
  group: string,
  locale: 'ja' | 'en'
): Promise<ArchiveItem[]> {
  const results = await Promise.all(
    periods.map(async p => {
      try {
        const channels = await getSnapshotSupersRanking({
          period: periodType,
          target: p.target,
          group,
          limit: 5
        })
        return {
          period: p.period,
          channels: simplifyChannels(channels)
        }
      } catch {
        return { period: p.period, channels: [] }
      }
    })
  )

  return results.map(r => ({
    id: r.period,
    title:
      formatSnapshotPeriod(
        r.period as WeeklySnapshotPeriod | MonthlySnapshotPeriod,
        locale
      ) || r.period,
    href: `/ranking/super-chat/channels/${group}/${r.period}`,
    channels: r.channels
  }))
}

/**
 * ChannelsRanking を簡略化してシリアライズ可能にする
 */
function simplifyChannels(
  channels: ChannelsRanking[]
): ArchiveItem['channels'] {
  return channels.map(ch => ({
    id: ch.channelId,
    title: ch.channelTitle,
    thumbnailUrl: ch.channelThumbnails
  }))
}
