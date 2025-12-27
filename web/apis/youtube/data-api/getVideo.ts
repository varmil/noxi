import 'server-only'
import { z } from 'zod'
import { CACHE_1D } from 'lib/fetchAPI'

const videoSchema = z.object({
  id: z.string(),
  snippet: z.object({
    title: z.string(),
    thumbnails: z.object({
      maxres: z.object({ url: z.string() }).optional(),
      high: z.object({ url: z.string() }).optional(),
      medium: z.object({ url: z.string() }).optional(),
      default: z.object({ url: z.string() })
    })
  })
})

const responseSchema = z.object({
  items: z.array(videoSchema).optional()
})

type VideoInfo = {
  id: string
  title: string
  thumbnailUrl: string
}

/**
 * 動画URLまたはIDからサムネイル情報を取得
 */
export async function getVideo(videoUrl: string): Promise<VideoInfo> {
  const videoId = extractVideoId(videoUrl)
  if (!videoId) {
    throw new Error(`Invalid video URL: ${videoUrl}`)
  }

  const apiKey = process.env.YOUTUBE_DATA_API_KEY
  if (!apiKey) {
    throw new Error('YouTube API キーが設定されていません')
  }

  const searchParams = new URLSearchParams({
    part: 'snippet',
    id: videoId,
    key: apiKey
  })

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )

  if (!res.ok) {
    throw new Error('YouTube APIからのレスポンスが正常ではありません')
  }

  const data = responseSchema.parse(await res.json())

  if (!data.items || data.items.length === 0) {
    throw new Error('動画が見つかりませんでした')
  }

  const video = data.items[0]
  const thumbnails = video.snippet.thumbnails
  const thumbnailUrl =
    thumbnails.maxres?.url ??
    thumbnails.high?.url ??
    thumbnails.medium?.url ??
    thumbnails.default.url

  return {
    id: video.id,
    title: video.snippet.title,
    thumbnailUrl
  }
}

/**
 * YouTube動画URLからvideoIdを抽出
 * 対応形式:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 */
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }

  // 直接videoIdが渡された場合
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url
  }

  return null
}
