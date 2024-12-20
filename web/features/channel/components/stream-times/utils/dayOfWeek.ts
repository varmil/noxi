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
  peak: number
}

type ReducedData = ChartData & {
  count: number
}

export function useGroupByDay(streams: StreamsSchema) {
  const data = Object.values(
    excludeMembersOnly(streams)
      .map<ChartData>(stream => ({
        dayOfWeek: dayjs.utc(stream.streamTimes.actualStartTime).format('dddd'),
        peak: stream.metrics.peakConcurrentViewers || 0
      }))
      .reduce<{ [dow: string]: ReducedData }>((acc, curr) => {
        const { dayOfWeek, peak } = curr

        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = {
            dayOfWeek,
            peak: 0,
            count: 0
          }
        }

        acc[dayOfWeek].peak += peak
        acc[dayOfWeek].count += 1

        return acc
      }, {})
  )

  // 曜日データを補完する処理
  DAYS_ORDER.forEach(day => {
    if (!data.some(item => item.dayOfWeek === day)) {
      data.push({
        dayOfWeek: day,
        peak: 0,
        count: 0
      })
    }
  })

  return data.sort((a, b) => {
    return DAYS_ORDER.indexOf(a.dayOfWeek) - DAYS_ORDER.indexOf(b.dayOfWeek)
  })
}

export function useAvarage(streams: StreamsSchema): ChartData[] {
  return useGroupByDay(streams).map(dayData => ({
    dayOfWeek: dayData.dayOfWeek,
    peak: Math.round(dayData.peak / dayData.count)
  }))
}

/**
 * avarage viewsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxViewsDay(streams: StreamsSchema) {
  const grouped = useAvarage(streams)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.peak > maxDay.peak ? currentDay : maxDay
  }, grouped[0])
}

/**
 * Live Stream countsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxLiveCountsDay(streams: StreamsSchema) {
  const grouped = useGroupByDay(streams)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.count > maxDay.count ? currentDay : maxDay
  }, grouped[0])
}
