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
  if (i === 0) return '🥇 '
  if (i === 1) return '🥈 '
  if (i === 2) return '🥉 '
  return `${i + 1}位. `
}

function getGroupTitle(group?: GroupId): string {
  if (!group) return 'VTuber総合'
  const groupStr = group.get()
  if (groupStr === 'independent') return '個人勢VTuber'
  return group.toJP()
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

    // 週の開始日（月曜）と終了日（日曜）を計算
    const weekStart = lastWeek.startOf('isoWeek')
    const weekEnd = lastWeek.endOf('isoWeek')
    const startStr = `${weekStart.month() + 1}/${weekStart.date()}`
    const endStr = `${weekEnd.month() + 1}/${weekEnd.date()}`

    // 前週末（日曜 23:59:59 JST）を targetDate として設定
    const targetDate = weekEnd.toDate()

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

    const line1 = `${getGroupTitle(group)}スパチャランキング`
    const line2 = `【週間】${year}年第${week}週（${startStr}~${endStr}）`
    const rankings = snapshots
      .map((s, i) => {
        return `${getRankPrefix(i)}${truncateTitle(
          channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo
            .title ?? ''
        )}`
      })
      .join('\n')
    const footer = `詳細・Top100はこちら`
    const url = `https://www.vcharts.net/ja/ranking/super-chat/channels${groupSlug}${periodSlug}${gender ? `?gender=${gender.get()}` : ''}`

    const content = `${line1}\n${line2}\n\n${rankings}\n\n${footer}\n${url}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted weekly ranking', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
