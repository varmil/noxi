import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Group } from '@domain/group'
import { Gender, Now } from '@domain/lib'
import { ChannelIds } from '@domain/youtube'

@Injectable()
export class XScenario {
  private readonly logger = new Logger(XScenario.name)
  private readonly formatter = Intl.DateTimeFormat('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })
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
      limit: 4
    })
    const channels = await this.channelsService.findAll({
      where: {
        id: new ChannelIds(sums.map(s => s.channelId))
      }
    })
    const searchParams = new URLSearchParams({
      dimension: 'super-chat',
      period: 'last24Hours',
      ...(group && { group: group.get() }),
      ...(gender && { gender: gender.get() }),
      date: new Date().toISOString()
    })

    const message1 =
      `${group ? group.toJP() : 'VTuber'}${gender ? gender.toJP() : ''}スパチャランキング ${this.formatter.format(new Date())}`
        .replace(/\s+/g, ' ')
        .trim()
    const message2 = sums
      .map(
        (s, i) =>
          `${i + 1}位．${channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo.title}`
      )
      .join('\n')
    const message3 = `タップですべて表示`
    const message4 = `https://www.peakx.net/ja/youtube/channels/ranking?${searchParams.toString()}`
    const content = `${message1}\n${message2}\n\n${message3}\n${message4}`
    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('tweeted', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
