import { VideosSchema } from 'api-schema/youtube/videoSchema'
import dayjs from 'lib/dayjs'

const DAYS_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type ChartData = {
  dayOfWeek: string
  views: number
  likes: number
  comments: number
}

type ReducedData = ChartData & {
  count: number
}

export function reduce(videos: VideosSchema) {
  const data = Object.values(
    videos
      .map<ChartData>(video => ({
        dayOfWeek: dayjs(video.snippet.publishedAt).format('ddd'),
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
