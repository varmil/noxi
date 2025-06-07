import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Group } from '@domain/group'
import { Gender, Now } from '@domain/lib'
import { ChannelIds } from '@domain/youtube'

const MAX_LENGTH_PER_LINE = 15

/** 日本語、英語が混在する場合にもスマホXで見やすい適切な長さに切り詰める */
function truncateTitle(
  title: string,
  maxWidth: number = MAX_LENGTH_PER_LINE
): string {
  let width = 0
  let result = ''

  for (const char of title) {
    // 半角文字（ASCII・英数字・記号）は0.5、それ以外（全角）は1
    width += char.match(/[\p{ASCII}]/u) ? 0.5 : 1

    if (width > maxWidth) {
      return result + '…'
    }

    result += char
  }

  return result
}

@Injectable()
export class XScenario {
  private readonly logger = new Logger(XScenario.name)
  private readonly xClient: TwitterApi

  constructor(
    private readonly supersBundlesService: SupersBundlesService,
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

  /**
   * 過去24時間のスパチャランキングをXへ投稿する
   **/
  async postChannelsRankingInLast24Hours({
    where: { group, gender }
  }: {
    where: { group?: Group; gender?: Gender }
  }) {
    const sums = await this.supersBundlesService.sum({
      where: { group, gender, createdAt: { gte: new Now().xDaysAgo(1) } },
      orderBy: { _sum: { amountMicros: 'desc' } },
      limit: 5
    })
    const channels = await this.channelsService.findAll({
      where: {
        id: new ChannelIds(sums.map(s => s.channelId))
      }
    })
    const groupSlug = group ? `/${group.get()}` : '/all'
    const periodSlug = '/last24Hours'
    const searchParams = new URLSearchParams({
      ...(gender && { gender: gender.get() }),
      date: new Date().toISOString()
    })

    const message1 =
      `本日の${group ? group.toJP() : '総合'}${gender ? gender.toJP() : ''}ランキング`
        .replace(/\s+/g, ' ')
        .trim()
    const message2 = sums
      .map((s, i) => {
        return `${i + 1}位.${truncateTitle(
          channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo
            .title ?? ''
        )}`
      })
      .join('\n')
    const message3 = `リアルタイム集計。タップですべて表示`
    const message4 = `https://www.vcharts.net/ja/ranking/channels${groupSlug}${periodSlug}?${searchParams.toString()}`
    const content = `${message1}\n\n${message2}\n\n${message3}\n${message4}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
