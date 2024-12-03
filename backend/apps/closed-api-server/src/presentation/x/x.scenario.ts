import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Now } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube'

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
  async postChannelsRankingInLast24Hours() {
    const sums = await this.supersBundlesService.sum({
      where: { actualEndTime: { gte: new Now().xDaysAgo(1) } },
      orderBy: { _sum: { amountMicros: 'desc' } },
      limit: 4
    })

    const channelIds = sums.map(s => s.channelId.get())
    const channels = await this.channelsService.findAll({
      where: { id: new ChannelIds(channelIds.map(id => new ChannelId(id))) }
    })

    const message1 = `VTuberスパチャランキングTop4 ${this.formatter.format(new Date())}`
    const message2 = sums
      .map(
        (s, i) =>
          `${i + 1}位．${channels.find(c => c.basicInfo.id.equals(s.channelId))?.basicInfo.title}`
      )
      .join('\n')
    const message3 = `※βテスト中。タップでTop30まで表示`
    const message4 = `https://www.peakx.net/ja/youtube/channels/ranking?dimension=super-chat&period=last24Hours&date=${new Date().toISOString()}`
    const content = `${message1}\n${message2}\n\n${message3}\n${message4}`

    const tweet = await this.xClient.v2.tweet(content)
    if (!tweet.errors) {
      this.logger.log('tweeted', tweet.data)
    } else {
      this.logger.error('tweet failed', tweet.errors)
    }
  }
}
