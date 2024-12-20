import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'
import { excludeMembersOnly } from 'utils/video/excludeMembersOnly'

const DAYS_ORDER = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

type ChartData = {
  dayOfWeek: string
  views: number
}

type ReducedData = ChartData & {
  count: number
}

export function useGroupByDay(streams: StreamsSchema) {
  const data = Object.values(
    excludeMembersOnly(streams)
      .map<ChartData>(stream => ({
        dayOfWeek: dayjs.utc(stream.snippet.publishedAt).format('dddd'),
        // TODO: views は stream.metrics.peakConcurrentViewers に置き換える
        views: stream.metrics.peakConcurrentViewers || 0
      }))
      .reduce<{ [dow: string]: ReducedData }>((acc, curr) => {
        const { dayOfWeek, views } = curr

        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = {
            dayOfWeek,
            views: 0,
            count: 0
          }
        }

        acc[dayOfWeek].views += views
        acc[dayOfWeek].count += 1

        return acc
      }, {})
  ).sort((a, b) => {
    return DAYS_ORDER.indexOf(a.dayOfWeek) - DAYS_ORDER.indexOf(b.dayOfWeek)
  })

  return data
}

export function useAvarage(streams: StreamsSchema): ChartData[] {
  return useGroupByDay(streams).map(dayData => ({
    dayOfWeek: dayData.dayOfWeek,
    views: Math.round(dayData.views / dayData.count)
  }))
}

/**
 * avarage viewsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxViewsDay(streams: StreamsSchema) {
  const grouped = useAvarage(streams)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.views > maxDay.views ? currentDay : maxDay
  }, grouped[0])
}

/**
 * video uploadsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxVideosDay(streams: StreamsSchema) {
  const grouped = useGroupByDay(streams)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.count > maxDay.count ? currentDay : maxDay
  }, grouped[0])
}
