import { Injectable } from '@nestjs/common'
import {
  Milestone,
  SubscriberMilestone,
  SubscriberMilestoneRepository,
  SubscriberMilestones
} from '@domain/subscriber-milestone'
import { ChannelId, ChannelIds } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SubscriberMilestoneRepositoryImpl
  implements SubscriberMilestoneRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll(args: {
    where: { channelIds: ChannelIds }
  }): Promise<SubscriberMilestones> {
    const rows =
      await this.prismaInfraService.channelSubscriberMilestone.findMany({
        where: {
          channelId: { in: args.where.channelIds.map(id => id.get()) }
        }
      })
    return new SubscriberMilestones(
      rows.map(
        row =>
          new SubscriberMilestone({
            channelId: new ChannelId(row.channelId),
            milestone: new Milestone(row.milestone),
            postedAt: row.postedAt
          })
      )
    )
  }

  async create(channelId: ChannelId, milestone: Milestone): Promise<void> {
    await this.prismaInfraService.channelSubscriberMilestone.upsert({
      where: {
        channelId_milestone: {
          channelId: channelId.get(),
          milestone: milestone.get()
        }
      },
      create: {
        channelId: channelId.get(),
        milestone: milestone.get()
      },
      update: {}
    })
  }
}
