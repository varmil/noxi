import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { SubscriberMilestoneService } from '@app/subscriber-milestone/subscriber-milestone.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Milestone } from '@domain/subscriber-milestone'
import { ChannelsInfraService } from '@infra/service/youtube-data-api/channels/channels.infra.service'
import { XMilestoneService } from '../service/x-milestone.service'

const BATCH_SIZE = 50

@Injectable()
export class MainScenario {
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly subscriberMilestoneService: SubscriberMilestoneService,
    private readonly groupsService: GroupsService,
    private readonly xMilestoneService: XMilestoneService
  ) {}

  async execute() {
    let offset = 0

    while (true) {
      // 1. DB からチャンネルを50件ずつ取得
      const dbChannels = await this.channelsService.findAll({
        orderBy: [{ id: 'asc' }],
        limit: BATCH_SIZE,
        offset
      })

      if (dbChannels.isEmpty()) break

      // 2. YouTube Data API から最新統計情報を取得
      const channelIds = dbChannels.ids()
      const apiChannels = await this.channelsInfraService.list({
        where: { channelIds }
      })

      // 3. 記録済みマイルストーンを取得
      const recorded = await this.subscriberMilestoneService.findAll({
        where: { channelIds }
      })

      // 4. チャンネルごとに未記録マイルストーンを確認
      for (const channel of apiChannels) {
        const channelId = channel.basicInfo.id
        const subscriberCount = channel.statistics.subscriberCount

        // マイルストーン算出
        const achieved = Milestone.calculateAchieved(subscriberCount)
        const recordedMilestones = recorded.milestonesOf(channelId)
        const unrecorded = achieved.diff(recordedMilestones)

        if (unrecorded.isEmpty()) continue

        // 最大のマイルストーン1つのみをポスト対象とする
        const maxMilestone = unrecorded.max()
        if (!maxMilestone) continue

        // DB のチャンネル情報から group を取得
        const dbChannel = dbChannels.find(c =>
          c.basicInfo.id.equals(channelId)
        )
        if (!dbChannel?.peakX) {
          this.logger.warn(
            `peakX not found for channel ${channelId.get()}, skipping`
          )
          continue
        }

        const group = await this.groupsService.findById(dbChannel.peakX.group)
        if (!group) {
          this.logger.warn(
            `group not found for ${dbChannel.peakX.group.get()}, skipping`
          )
          continue
        }

        // X に投稿
        try {
          await this.xMilestoneService.post({
            channelId,
            channelTitle: channel.basicInfo.title,
            milestone: maxMilestone,
            groupSlug: group.id
          })
          this.logger.log(
            `Posted milestone ${maxMilestone.get()} for ${channel.basicInfo.title}`
          )
        } catch (e) {
          this.logger.error(
            `Failed to post milestone for ${channel.basicInfo.title}`,
            e
          )
        }

        // 投稿したもの + スキップした小さいマイルストーンも全て記録
        for (const milestone of unrecorded) {
          await this.subscriberMilestoneService.create(channelId, milestone)
        }
      }

      offset += BATCH_SIZE
    }

    this.logger.log('Finished posting subscriber milestones')
  }
}
