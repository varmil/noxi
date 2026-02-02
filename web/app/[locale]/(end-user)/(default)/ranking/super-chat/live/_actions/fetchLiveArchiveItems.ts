'use server'

import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getStreams } from 'apis/youtube/getStreams'
import { formatWeeklyPeriodSplit } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import { generateMonthlyPeriods } from 'features/hub-page/utils/generateMonthlyPeriods'
import { generateWeeklyPeriods } from 'features/hub-page/utils/generateWeeklyPeriods'
import { MonthlySnapshotPeriod, WeeklySnapshotPeriod } from 'types/period'
import {
  formatSnapshotPeriod,
  getSnapshotDateRange
} from 'utils/period/snapshot-period'

export type LiveArchiveItem = {
  id: string
  title: string
  subtitle?: string
  href: string
  streams: {
    id: string
    title: string
    thumbnailUrl: string | undefined
  }[]
}

export type FetchLiveArchiveItemsResult = {
  items: LiveArchiveItem[]
  hasMore: boolean
  totalCount: number
}

type PeriodBase = {
  period: string
  target: string
}

/**
 * 週間または月間のライブアーカイブアイテムを取得する Server Action
 *
 * @param type - 'weekly' または 'monthly'
 * @param group - グループID（'all' で全グループ）
 * @param locale - ロケール
 * @param offset - 取得開始位置
 * @param limit - 取得件数
 */
export async function fetchLiveArchiveItems(
  type: 'weekly' | 'monthly',
  group: string,
  locale: 'ja' | 'en',
  offset: number,
  limit: number
): Promise<FetchLiveArchiveItemsResult> {
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
): Promise<LiveArchiveItem[]> {
  const results = await Promise.all(
    periods.map(async p => {
      try {
        // スナップショット期間の日付範囲を取得
        const snapshotPeriod =
          periodType === 'weekly'
            ? (`weekly-${p.target}` as WeeklySnapshotPeriod)
            : (`monthly-${p.target}` as MonthlySnapshotPeriod)
        const { start, end } = getSnapshotDateRange(snapshotPeriod)

        // Top5 配信を取得（スパチャ金額順、配信開始時刻でフィルタリング）
        const bundles = await getSupersBundles({
          group: group === 'all' ? undefined : group,
          actualStartTimeGTE: start,
          actualStartTimeLTE: end,
          orderBy: [{ field: 'amountMicros', order: 'desc' }],
          limit: 5
        })

        if (bundles.length === 0) {
          return { period: p.period, streams: [] }
        }

        // videoIds から配信詳細を取得
        const videoIds = bundles.map(b => b.videoId)
        const streams = await getStreams({ videoIds })

        // スパチャ金額順に並び替え
        const orderedStreams = bundles.map(b => {
          const stream = streams.find(s => s.videoId === b.videoId)
          return {
            id: b.videoId,
            title: stream?.snippet.title || '',
            thumbnailUrl: stream?.snippet.thumbnails?.medium?.url
          }
        })

        return { period: p.period, streams: orderedStreams }
      } catch {
        return { period: p.period, streams: [] }
      }
    })
  )

  return results.map(r => {
    const weeklySplit = formatWeeklyPeriodSplit(
      r.period as WeeklySnapshotPeriod | MonthlySnapshotPeriod,
      locale
    )

    if (weeklySplit) {
      return {
        id: r.period,
        title: weeklySplit.title,
        subtitle: weeklySplit.subtitle,
        href: `/ranking/super-chat/live/${group}/${r.period}`,
        streams: r.streams
      }
    }

    return {
      id: r.period,
      title:
        formatSnapshotPeriod(
          r.period as WeeklySnapshotPeriod | MonthlySnapshotPeriod,
          locale
        ) || r.period,
      href: `/ranking/super-chat/live/${group}/${r.period}`,
      streams: r.streams
    }
  })
}
