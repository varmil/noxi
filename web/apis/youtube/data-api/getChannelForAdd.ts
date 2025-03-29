'use server'

import { CACHE_12H } from 'lib/fetchAPI'

/** チャンネル申請用 */
export type ChannelInfo = {
  title: string
  thumbnail: string
  subscriberCount: number
  liveStreamCount: number
  meetsSubscriberRequirement: boolean
  meetsLiveStreamRequirement: boolean
}

/**
 * チャンネル申請用
 * YouTube Data APIを使用してチャンネル情報を取得する関数
 **/
export async function getChannelForAdd(
  channelId: string
): Promise<ChannelInfo> {
  try {
    const API_KEY = process.env.YOUTUBE_DATA_API_KEY
    if (!API_KEY) {
      throw new Error('YouTube API キーが設定されていません')
    }

    // チャンネル基本情報と登録者数を取得
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`,
      { next: { revalidate: CACHE_12H } }
    )
    if (!channelResponse.ok) {
      throw new Error('YouTube APIからのレスポンスが正常ではありません')
    }
    const channelData = await channelResponse.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('チャンネルが見つかりませんでした')
    }

    const channel = channelData.items[0]
    const subscriberCount =
      Number.parseInt(channel.statistics.subscriberCount, 10) || 0
    const meetsSubscriberRequirement = subscriberCount >= 1000

    // 30日前の日付を計算
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString()

    // 直近30日間のライブ配信を検索
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=completed&publishedAfter=${thirtyDaysAgoISOString}&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: CACHE_12H } }
    )
    if (!searchResponse.ok) {
      throw new Error('YouTube 検索APIからのレスポンスが正常ではありません')
    }

    const searchData = await searchResponse.json()
    const liveStreamCount = searchData.items ? searchData.items.length : 0
    const meetsLiveStreamRequirement = liveStreamCount >= 4

    return {
      title: channel.snippet.title,
      thumbnail: channel.snippet.thumbnails.default.url,
      subscriberCount,
      liveStreamCount,
      meetsSubscriberRequirement,
      meetsLiveStreamRequirement
    }
  } catch (error) {
    console.error('チャンネル情報の取得に失敗しました:', error)
    throw error
  }
}
