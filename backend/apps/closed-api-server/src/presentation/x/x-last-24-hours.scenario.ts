import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { TwitterApi } from 'twitter-api-v2'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { GroupId } from '@domain/group'
import { Gender, Now } from '@domain/lib'
import { ChannelIds } from '@domain/youtube'

dayjs.extend(utc)
dayjs.extend(timezone)

const MAX_LENGTH_PER_LINE = 12

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

function getRankPrefix(i: number): string {
  if (i === 0) return '🥇  '
  if (i === 1) return '🥈  '
  if (i === 2) return '🥉  '
  return `${i + 1}位. `
}

function getGroupTitle(group?: GroupId): string {
  if (!group) return 'VTuber総合'
  return group.toJP()
}

const DAY_OF_WEEK_JP = ['日', '月', '火', '水', '木', '金', '土']

@Injectable()
export class XLast24HoursScenario {
  private readonly logger = new Logger(XLast24HoursScenario.name)
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
    where: { group?: GroupId; gender?: Gender }
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

    // 日付情報（JST）
    const now = dayjs().tz('Asia/Tokyo')
    const year = now.year()
    const month = now.month() + 1
    const day = now.date()
    const dayOfWeek = DAY_OF_WEEK_JP[now.day()]

    const groupSlug = group ? `/${group.get()}` : '/all'
    const periodSlug = '/last24Hours'
    const searchParams = new URLSearchParams({
      ...(gender && { gender: gender.get() }),
      date: new Date().toISOString()
    })

    const line1 = `${getGroupTitle(group)}スパチャランキング`
    const line2 = `【日次】${year}年${month}月${day}日（${dayOfWeek}）`
    const rankings = sums
      .map((s, i) => {
        return `${getRankPrefix(i)}${truncateTitle(
          channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo
            .title ?? ''
        )}`
      })
      .join('\n')
    const footer = `タップですべて表示`
    const url = `https://www.vcharts.net/ja/ranking/super-chat/channels${groupSlug}${periodSlug}?${searchParams.toString()}`

    const content = `${line1}\n${line2}\n\n${rankings}\n\n${footer}\n${url}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
