import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { ChannelViewCountRankingsService } from '@app/channel-view-count-rankings/channel-view-count-rankings.service'
import { ChannelViewCountRankings } from '@domain/channel-view-count-ranking'

const MAX_LENGTH_PER_LINE = 13

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

@Injectable()
export class XViewCountRankingScenario {
  private readonly logger = new Logger(XViewCountRankingScenario.name)
  private readonly xClient: TwitterApi

  constructor(
    private readonly channelViewCountRankingsService: ChannelViewCountRankingsService
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

  async postWeeklyViewCountRanking() {
    const dateRange = this.getWeeklyDateRange()
    const rankings = await this.channelViewCountRankingsService.findAll({
      where: { dateRange },
      limit: 40
    })

    const imageBuffer = await this.fetchImage('weekly-view-count-ranking')
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('週間', rankings)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted weekly view count ranking', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }

  async postMonthlyViewCountRanking() {
    const dateRange = this.getMonthlyDateRange()
    const rankings = await this.channelViewCountRankingsService.findAll({
      where: { dateRange },
      limit: 40
    })

    const imageBuffer = await this.fetchImage('monthly-view-count-ranking')
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('月間', rankings)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted monthly view count ranking', tweet.data)
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
    rankings: ChannelViewCountRankings
  ): string {
    const top5 = rankings.take(5)

    const rankingLines = top5.map(
      (r, i) => `${i + 1}位. ${truncateTitle(r.channelTitle.get())}`
    )

    const lines = [
      `📊${period}YouTube再生数ランキング`,
      '',
      ...rankingLines,
      '',
      '再生数TOP40は👇️'
    ]

    return lines.join('\n')
  }
}
