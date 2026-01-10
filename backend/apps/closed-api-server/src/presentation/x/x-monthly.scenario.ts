import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { TwitterApi } from 'twitter-api-v2'
import { SupersSnapshotsService } from '@app/supers-snapshots/supers-snapshots.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
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
  return `${i + 1}位. `
}

function getGroupTitle(group?: GroupId): string {
  if (!group) return 'VTuber総合'
  return group.toJP()
}

@Injectable()
export class XMonthlyScenario {
  private readonly logger = new Logger(XMonthlyScenario.name)
  private readonly xClient: TwitterApi

  constructor(
    private readonly supersSnapshotsService: SupersSnapshotsService,
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
   * 直前の月のスパチャランキングをXへ投稿する
   * 毎月1日 23:15-23:45 JST に実行される想定
   **/
  async postChannelsRankingMonthly({
    where: { group, gender }
  }: {
    where: { group?: GroupId; gender?: Gender }
  }) {
    // 現在日時（JST）から直前の月を計算
    // 1日に実行されるので、前月のデータを取得
    const now = dayjs().tz('Asia/Tokyo')
    const lastMonth = now.subtract(1, 'month')
    const year = lastMonth.year()
    const month = lastMonth.month() + 1 // dayjs の month は 0-indexed
    const monthStr = `${year}-${String(month).padStart(2, '0')}`

    // 前月末（23:59:59 JST）を targetDate として設定
    const targetDate = lastMonth.endOf('month').toDate()

    const snapshots = await this.supersSnapshotsService.findRanking({
      where: { targetDate, period: 'monthly', group, gender },
      limit: 6
    })

    const channelIds = new ChannelIds(snapshots.map(s => s.channelId))
    const channels = await this.channelsService.findAll({
      where: { id: channelIds }
    })

    const groupSlug = group ? `/${group.get()}` : '/all'
    const periodSlug = `/monthly-${monthStr}`

    const line1 = `【月間】${getGroupTitle(group)}ランキング`
    // const line2 = `${year}年${month}月`
    const rankings = snapshots
      .map((s, i) => {
        return `${getRankPrefix(i)}${truncateTitle(
          channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo
            .title ?? ''
        )}`
      })
      .join('\n')
    const footer = `画像タップですべて表示`
    const url = `https://www.vcharts.net/ja/ranking/super-chat/channels${groupSlug}${periodSlug}${gender ? `?gender=${gender.get()}` : ''}`

    const content = `${line1}\n\n${rankings}\n\n${footer}\n${url}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted monthly ranking', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
