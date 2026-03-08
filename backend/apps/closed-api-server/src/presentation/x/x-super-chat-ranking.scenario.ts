import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { ChannelSupersRankingsService } from '@app/channel-supers-rankings/channel-supers-rankings.service'
import { ChannelSupersRankings } from '@domain/channel-supers-ranking'

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
export class XSuperChatRankingScenario {
  private readonly logger = new Logger(XSuperChatRankingScenario.name)
  private readonly xClient: TwitterApi

  constructor(
    private readonly channelSupersRankingsService: ChannelSupersRankingsService
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

  async postWeeklySuperChatRanking() {
    const { currentDate, previousDate } = this.getWeeklyDates()
    const rankings = await this.channelSupersRankingsService.findAll({
      where: { currentDate, previousDate, period: 'weekly' },
      limit: 40
    })

    const imageBuffer = await this.fetchImage('weekly-super-chat-ranking')
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('週間', rankings)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted weekly super chat ranking', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }

  async postMonthlySuperChatRanking() {
    const { currentDate, previousDate } = this.getMonthlyDates()
    const rankings = await this.channelSupersRankingsService.findAll({
      where: { currentDate, previousDate, period: 'monthly' },
      limit: 40
    })

    const imageBuffer = await this.fetchImage('monthly-super-chat-ranking')
    const mediaId = await this.uploadImage(imageBuffer)
    const text = this.buildTweetText('月間', rankings)

    const tweet = await this.xClient.v2.tweet(text, {
      media: { media_ids: [mediaId] }
    })

    if (!tweet.errors) {
      this.logger.log('Posted monthly super chat ranking', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }

  private getWeeklyDates(): { currentDate: Date; previousDate: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    const currentDate = new Date(Date.UTC(year, month, day, -9))
    const previousDate = new Date(Date.UTC(year, month, day - 7, -9))

    return { currentDate, previousDate }
  }

  private getMonthlyDates(): { currentDate: Date; previousDate: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()

    const currentDate = new Date(Date.UTC(year, month, 1, -9))
    const previousDate = new Date(Date.UTC(year, month - 1, 1, -9))

    return { currentDate, previousDate }
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
    rankings: ChannelSupersRankings
  ): string {
    const top5 = rankings.take(5)

    const rankingLines = top5.map(
      (r, i) => `${i + 1}位. ${truncateTitle(r.channelTitle.get())}`
    )

    const lines = [
      `💴${period}YouTubeスパチャランキング`,
      '',
      ...rankingLines,
      '',
      '詳細はサイト内にて掲載中'
    ]

    return lines.join('\n')
  }
}
