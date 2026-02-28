import { Injectable, Logger } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { GroupId, GroupName } from '@domain/group'
import { Milestone } from '@domain/subscriber-milestone'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class XMilestoneService {
  private readonly logger = new Logger(XMilestoneService.name)
  private readonly xClient: TwitterApi

  constructor() {
    const { X_APP_KEY, X_APP_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } =
      process.env
    this.xClient = new TwitterApi({
      appKey: X_APP_KEY ?? '',
      appSecret: X_APP_SECRET ?? '',
      accessToken: X_ACCESS_TOKEN ?? '',
      accessSecret: X_ACCESS_SECRET ?? ''
    })
  }

  async post(args: {
    channelId: ChannelId
    channelTitle: string
    milestone: Milestone
    groupSlug: GroupId
    groupName: GroupName
  }) {
    const { channelId, channelTitle, milestone, groupSlug, groupName } = args
    const formattedMilestone = milestone.format()

    const content = [
      `🎉【祝】登録者${formattedMilestone}人達成`,
      '',
      channelTitle,
      `（${groupName.get()}）`,
      '',
      `YouTubeチャンネル登録者数${formattedMilestone}人達成おめでとうございます！`,
      '',
      '画像タップで詳細を表示',
      `https://www.vcharts.net/ja/${groupSlug.get()}/channels/${channelId.get()}?sub=${milestone.get()}`
    ].join('\n')

    const tweet = await this.xClient.v2.tweet(content)

    if (!tweet.errors) {
      this.logger.log('Posted milestone tweet', tweet.data)
    } else {
      this.logger.error('Tweet failed', tweet.errors)
    }
  }
}
