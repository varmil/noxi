import 'server-only'
import { z } from 'zod'
import { CACHE_1D } from 'lib/fetchAPI'

const channelSchema = z.object({
  id: z.string(),
  snippet: z.object({
    title: z.string(),
    thumbnails: z.object({
      high: z.object({ url: z.string() }).optional(),
      medium: z.object({ url: z.string() }).optional(),
      default: z.object({ url: z.string() })
    })
  })
})

const responseSchema = z.object({
  items: z.array(channelSchema).optional()
})

type ChannelInfo = {
  id: string
  name: string
  iconUrl: string
}

/**
 * チャンネルURLからチャンネル情報を取得
 * ハンドル形式（@username）とチャンネルID形式の両方に対応
 */
export async function getChannel(channelUrl: string): Promise<ChannelInfo> {
  const apiKey = process.env.YOUTUBE_DATA_API_KEY
  if (!apiKey) {
    throw new Error('YouTube API キーが設定されていません')
  }

  const channelIdentifier = parseChannelUrl(channelUrl)
  if (!channelIdentifier) {
    throw new Error(`Invalid channel URL: ${channelUrl}`)
  }

  const searchParams = new URLSearchParams({
    part: 'snippet',
    key: apiKey
  })

  // ハンドル形式の場合は forHandle、ID形式の場合は id パラメータを使用
  if (channelIdentifier.type === 'handle') {
    searchParams.set('forHandle', channelIdentifier.value)
  } else {
    searchParams.set('id', channelIdentifier.value)
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )

  if (!res.ok) {
    throw new Error('YouTube APIからのレスポンスが正常ではありません')
  }

  const data = responseSchema.parse(await res.json())

  if (!data.items || data.items.length === 0) {
    throw new Error('チャンネルが見つかりませんでした')
  }

  const channel = data.items[0]
  const thumbnails = channel.snippet.thumbnails
  const iconUrl =
    thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default.url

  return {
    id: channel.id,
    name: channel.snippet.title,
    iconUrl
  }
}

type ChannelIdentifier =
  | { type: 'handle'; value: string }
  | { type: 'id'; value: string }

/**
 * YouTubeチャンネルURLを解析してハンドルまたはチャンネルIDを抽出
 * 対応形式:
 * - https://www.youtube.com/@ShirakamiFubuki（ハンドル形式）
 * - https://www.youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg（チャンネルID形式）
 */
function parseChannelUrl(url: string): ChannelIdentifier | null {
  // ハンドル形式: @username
  const handleMatch = url.match(/youtube\.com\/@([a-zA-Z0-9_.-]+)/)
  if (handleMatch?.[1]) {
    return { type: 'handle', value: handleMatch[1] }
  }

  // チャンネルID形式: /channel/UC...
  const channelIdMatch = url.match(/youtube\.com\/channel\/(UC[a-zA-Z0-9_-]+)/)
  if (channelIdMatch?.[1]) {
    return { type: 'id', value: channelIdMatch[1] }
  }

  // 直接チャンネルIDが渡された場合
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(url)) {
    return { type: 'id', value: url }
  }

  // 直接ハンドルが渡された場合（@付き）
  if (/^@[a-zA-Z0-9_.-]+$/.test(url)) {
    return { type: 'handle', value: url.slice(1) }
  }

  return null
}
