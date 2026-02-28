import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { ChannelId } from '@domain/youtube'
import { Milestone } from './Milestone.vo'
import { Milestones } from './Milestones.collection'
import { SubscriberMilestone } from './SubscriberMilestone.entity'

export class SubscriberMilestones extends Collection<SubscriberMilestone> {
  constructor(protected readonly list: SubscriberMilestone[]) {
    super(list)
  }

  /** channelId ごとの記録済み Milestones を取得 */
  @Exclude()
  milestonesOf(channelId: ChannelId): Milestones {
    return new Milestones(
      this.list
        .filter(sm => sm.channelId.equals(channelId))
        .map(sm => new Milestone(sm.milestone.get()))
    )
  }
}
