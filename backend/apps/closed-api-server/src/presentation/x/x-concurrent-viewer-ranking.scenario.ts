import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { StreamsService } from '@app/streams/streams.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Streams, StreamStatusEnded } from '@domain/stream'
import { ChannelId, ChannelIds, Channels } from '@domain/youtube'

const MAX_LENGTH_PER_LINE = 11

/** 日本語、英語が混在する場合にもスマホXで見やすい適切な長さに切り詰める */
function truncateTitle(
  title: string,
  maxWidth: number = MAX_LENGTH_PER_LINE
): string {
  let width = 0
  let result = ''

  for (const char of title) {
    width += char.match(/[\p{ASCII}]/u) ? 0.5 : 1

    if (width > maxWidth) {
      return result + '…'
    }

    result += char
  }

  return result
}

function formatConcurrentViewers(n: number): string {
  if (n >= 10_000) {
    return `${(n / 10_000).toFixed(1)}万人`
  }
  return `${n.toLocaleString('ja-JP')}人`
}

@Injectable()
export class XConcurrentViewerRankingScenario {
  private readonly logger = new Logger(XConcurrentViewerRankingScenario.name)
  private readonly xClient: TwitterApi

  constructor(
    private readonly streamsService: StreamsService,
    private readonly channelsService: ChannelsService
  ) {
    const { X_APP_KEY, X_APP_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } =
      process.env
    this.xClient = new TwitterApi({
      appKey: X_APP_KEY ?? '',
      appSecret: X_APP_SECRET ?? '',
      accessToken: X_ACCESS_TOKEN ?? '',
      accessSecret: X_ACCESS_SECRET ?? ''
    })
  }

  async postWeeklyConcurrentViewerRanking() {
    const dateRange = this.getWeeklyDateRange()
    const streams = await this.streamsService.findAll({
      where: {
        status: StreamStatusEnded,
        actualStartTime: { gte: dateRange.gte, lte: dateRange.lt }
      },
      orderBy: [{ maxViewerCount: 'desc' }],
      limit: 40
    })

    const channelIds = new ChannelIds(
      [...new Set(streams.map(s => s.snippet.channelId.get()))].map(
        id => new ChannelId(id)
      )
    )

    const channels = await this.channelsService.findAll({
      where: { id: channelIds }
    })

    const imageBuffer = await this.fetchImage(
      'weekly-concurrent-viewer-ranking'
    )
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('週間', streams, channels)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted weekly concurrent viewer ranking', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }

  async postMonthlyConcurrentViewerRanking() {
    const dateRange = this.getMonthlyDateRange()
    const streams = await this.streamsService.findAll({
      where: {
        status: StreamStatusEnded,
        actualStartTime: { gte: dateRange.gte, lte: dateRange.lt }
      },
      orderBy: [{ maxViewerCount: 'desc' }],
      limit: 40
    })

    const channelIds = new ChannelIds(
      [...new Set(streams.map(s => s.snippet.channelId.get()))].map(
        id => new ChannelId(id)
      )
    )

    const channels = await this.channelsService.findAll({
      where: { id: channelIds }
    })

    const imageBuffer = await this.fetchImage(
      'monthly-concurrent-viewer-ranking'
    )
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('月間', streams, channels)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted monthly concurrent viewer ranking', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }

  private getWeeklyDateRange(): { gte: Date; lt: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    const lt = new Date(Date.UTC(year, month, day, -9))
    const gte = new Date(Date.UTC(year, month, day - 7, -9))

    return { gte, lt }
  }

  private getMonthlyDateRange(): { gte: Date; lt: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()

    const lt = new Date(Date.UTC(year, month, 1, -9))
    const gte = new Date(Date.UTC(year, month - 1, 1, -9))

    return { gte, lt }
  }

  private async fetchImage(path: string): Promise<Buffer> {
    const webUrl = process.env.WEB_URL ?? 'http://localhost:3000'
    const res = await fetch(`${webUrl}/api/og/${path}`, {
      headers: {
        'x-og-bypass': 'true'
      },
      signal: AbortSignal.timeout(300_000)
    })

    if (!res.ok) {
      throw new Error(
        `Failed to fetch OGP image: ${res.status} ${res.statusText}`
      )
    }

    const arrayBuffer = await res.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  private async uploadImage(imageBuffer: Buffer): Promise<string> {
    const mediaId = await this.xClient.v1.uploadMedia(imageBuffer, {
      mimeType: 'image/png'
    })
    return mediaId
  }

  private buildTweetText(
    period: '週間' | '月間',
    streams: Streams,
    channels: Channels
  ): string {
    const top5 = streams.take(5)

    const rankingLines = top5.map((s, i) => {
      const channel = channels.find(c =>
        c.basicInfo.id.equals(s.snippet.channelId)
      )
      const name = truncateTitle(channel?.basicInfo.title ?? '')
      const viewers = formatConcurrentViewers(s.metrics.peakConcurrentViewers)
      return `${i + 1}位. ${name} (${viewers})`
    })

    const lines = [
      `📊${period}同接数ランキングTOP40`,
      '',
      ...rankingLines,
      '',
      '詳細はサイト内にて掲載中'
    ]

    return lines.join('\n')
  }
}
