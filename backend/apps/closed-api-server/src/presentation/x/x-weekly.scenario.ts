import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
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
dayjs.extend(isoWeek)

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
export class XWeeklyScenario {
  private readonly logger = new Logger(XWeeklyScenario.name)
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
   * 直前の週のスパチャランキングをXへ投稿する
   * 毎週月曜 12:00-12:30 JST に実行される想定
   **/
  async postChannelsRankingWeekly({
    where: { group, gender }
  }: {
    where: { group?: GroupId; gender?: Gender }
  }) {
    // 現在日時（JST）から直前の週を計算
    // 月曜に実行されるので、前週（日曜まで）のデータを取得
    const now = dayjs().tz('Asia/Tokyo')
    const lastWeek = now.subtract(1, 'week')
    const year = lastWeek.isoWeekYear()
    const week = lastWeek.isoWeek()
    const weekStr = `${year}-W${String(week).padStart(2, '0')}`

    // 前週末（日曜 23:59:59 JST）を targetDate として設定
    const targetDate = lastWeek.endOf('isoWeek').toDate()

    const snapshots = await this.supersSnapshotsService.findRanking({
      where: { targetDate, period: 'weekly', group, gender },
      limit: 5
    })

    const channelIds = new ChannelIds(snapshots.map(s => s.channelId))
    const channels = await this.channelsService.findAll({
      where: { id: channelIds }
    })

    const groupSlug = group ? `/${group.get()}` : '/all'
    const periodSlug = `/weekly-${weekStr}`

    const message1 =
      `${year}年第${week}週 ${group ? group.toJP() : '総合'}${gender ? gender.toJP() : ''}ランキング`
        .replace(/\s+/g, ' ')
        .trim()
    const message2 = snapshots
      .map((s, i) => {
        return `${i + 1}位.${truncateTitle(
          channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo
            .title ?? ''
        )}`
      })
      .join('\n')
    const message3 = `タップですべて表示`
    const message4 = `https://www.vcharts.net/ja/ranking/super-chat/channels${groupSlug}${periodSlug}${gender ? `?gender=${gender.get()}` : ''}`
    const content = `${message1}\n\n${message2}\n\n${message3}\n${message4}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted weekly ranking', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
