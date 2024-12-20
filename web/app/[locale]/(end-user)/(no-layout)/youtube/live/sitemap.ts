import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { getEntry } from 'config/sitemap/getEntry'
import { CACHE_1D } from 'lib/fetchAPI'
import type { MetadataRoute } from 'next'

const LIMIT = 2000

// Streamsの総数 / LIMIT = 総ページ数
export async function generateSitemaps() {
  return [...Array(10)].map((_, i) => ({ id: i }))
}

// Google's limit is 50,000 URLs per sitemap
export default async function sitemap({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const streams = await getStreams({
    orderBy: [{ field: 'videoId', order: 'asc' }],
    limit: LIMIT,
    offset: id * LIMIT,
    revalidate: CACHE_1D
  })
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId),
    limit: streams.length
  })

  return streams
    .map(stream => {
      const {
        videoId,
        snippet: { title, thumbnails }
      } = stream

      const channel = channels.find(
        channel => channel.basicInfo.id === stream.snippet.channelId
      )
      if (!channel) return null
      const {
        basicInfo: { title: cName }
      } = channel

      const DEFAULT = {
        content_loc: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail_loc: thumbnails?.standard?.url ?? ''
      }

      return getEntry({
        pathname: `/youtube/live/${videoId}`,
        // lastModified: updatedAt,
        videos: [
          // JP
          {
            title: getTitle({ locale: 'ja', channel: cName, title }),
            description: getDesc({ locale: 'ja', channel: cName }),
            ...DEFAULT
          },
          // EN
          {
            title: getTitle({ locale: 'en', channel: cName, title }),
            description: getDesc({ locale: 'en', channel: cName }),
            ...DEFAULT
          }
        ]
      })
    })
    .filter(e => !!e)
}

/**
 * 翻訳ファイル175行目あたりをコピペしただけ
 */
const getTitle = ({
  locale,
  channel,
  title
}: {
  locale: 'en' | 'ja'
  channel: string
  title: string
}) => {
  if (locale === 'ja') {
    return `${channel} ${escape(ellipsis(title))}のスパチャ金額、同接数 - PeakX`
  }
  if (locale === 'en') {
    return `${channel} ${escape(ellipsis(title))} - Live Stats - PeakX`
  }
  return ``
}

/**
 * 翻訳ファイル175行目あたりをコピペしただけ
 */
const getDesc = ({
  locale,
  channel
}: {
  locale: 'en' | 'ja'
  channel: string
}) => {
  if (locale === 'ja') {
    return `YouTubeライブを視聴！${escape(
      channel
    )}のスパチャ金額や同接数をチェックし人気の瞬間を見逃さず確認しよう。PeakXではなんとスパチャコメントもすべて掲載！VTuberファン必見の情報をお届けします。`
  }
  if (locale === 'en') {
    return `Watch YouTube Live! Check ${escape(
      channel
    )}'s Super Chat and Concurrent Viewers. PeakX even publishes all Super Chat comments! VTuber fans must see this.`
  }
  return ``
}

const ellipsis = (str: string) =>
  str.length > 22 ? str.slice(0, 22 - 1) + '…' : str
const escape = (str: string) => str.replaceAll('&', 'and')
