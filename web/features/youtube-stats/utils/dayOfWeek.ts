import { VideosSchema } from 'api/youtube/schema/videoSchema'
import dayjs from 'lib/dayjs'

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
  likes: number
  comments: number
}

type ReducedData = ChartData & {
  count: number
}

export function useGroupByDay(videos: VideosSchema) {
  const data = Object.values(
    videos
      .map<ChartData>(video => ({
        dayOfWeek: dayjs.utc(video.snippet.publishedAt).format('dddd'),
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        comments: video.statistics.commentCount
      }))
      .reduce<{ [dow: string]: ReducedData }>((acc, curr) => {
        const { dayOfWeek, views, likes, comments } = curr

        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = {
            dayOfWeek,
            views: 0,
            likes: 0,
            comments: 0,
            count: 0
          }
        }

        acc[dayOfWeek].views += views
        acc[dayOfWeek].likes += likes
        acc[dayOfWeek].comments += comments
        acc[dayOfWeek].count += 1

        return acc
      }, {})
  ).sort((a, b) => {
    return DAYS_ORDER.indexOf(a.dayOfWeek) - DAYS_ORDER.indexOf(b.dayOfWeek)
  })

  return data
}

export function useAvarage(videos: VideosSchema): ChartData[] {
  return useGroupByDay(videos).map(dayData => ({
    dayOfWeek: dayData.dayOfWeek,
    views: Math.round(dayData.views / dayData.count),
    likes: Math.round(dayData.likes / dayData.count),
    comments: Math.round(dayData.comments / dayData.count)
  }))
}

/**
 * avarage viewsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxViewsDay(videos: VideosSchema) {
  const grouped = useAvarage(videos)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.views > maxDay.views ? currentDay : maxDay
  }, grouped[0])
}

/**
 * video uploadsが最も多い曜日がオブジェクト形式で抽出されます。
 */
export function useMaxVideosDay(videos: VideosSchema) {
  const grouped = useGroupByDay(videos)
  return grouped.reduce((maxDay, currentDay) => {
    return currentDay.count > maxDay.count ? currentDay : maxDay
  }, grouped[0])
}
