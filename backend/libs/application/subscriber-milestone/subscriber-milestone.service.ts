import { Inject, Injectable } from '@nestjs/common'
import { SubscriberMilestoneRepository } from '@domain/subscriber-milestone'
import type { Milestone } from '@domain/subscriber-milestone'
import type { ChannelId } from '@domain/youtube'

@Injectable()
export class SubscriberMilestoneService {
  constructor(
    @Inject('SubscriberMilestoneRepository')
    private readonly repository: SubscriberMilestoneRepository
  ) {}

  async findAll(
    args: Parameters<SubscriberMilestoneRepository['findAll']>[0]
  ) {
    return await this.repository.findAll(args)
  }

  async create(channelId: ChannelId, milestone: Milestone) {
    return await this.repository.create(channelId, milestone)
  }
}
