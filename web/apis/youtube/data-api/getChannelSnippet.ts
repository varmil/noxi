'use server'

import { CACHE_12H } from 'lib/fetchAPI'

/**
 * YouTube Data APIを使用してチャンネル情報を取得する関数
 */
export async function getChannelSnippet(channelId: string): Promise<{
  title: string
  thumbnail: string
}> {
  try {
    const API_KEY = process.env.YOUTUBE_DATA_API_KEY
    if (!API_KEY) {
      throw new Error('YouTube API キーが設定されていません')
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`,
      { next: { revalidate: CACHE_12H } }
    )
    if (!response.ok) {
      throw new Error('YouTube APIからのレスポンスが正常ではありません')
    }

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      const channel = data.items[0]
      return {
        title: channel.snippet.title,
        thumbnail: channel.snippet.thumbnails.default.url
      }
    } else {
      throw new Error('チャンネルが見つかりませんでした')
    }
  } catch (error) {
    console.error('チャンネル情報の取得に失敗しました:', error)
    throw error
  }
}
