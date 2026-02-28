import { ChannelIds, ChannelId  } from '@domain/youtube'
import { Milestone } from './Milestone.vo'
import { SubscriberMilestones } from './SubscriberMilestones.collection'

export interface SubscriberMilestoneRepository {
  findAll(args: {
    where: { channelIds: ChannelIds }
  }): Promise<SubscriberMilestones>

  create(channelId: ChannelId, milestone: Milestone): Promise<void>
}
