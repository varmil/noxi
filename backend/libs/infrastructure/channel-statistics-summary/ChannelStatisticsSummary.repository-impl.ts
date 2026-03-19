import { Injectable } from '@nestjs/common'
import { ChannelStatisticsSummaryRepository } from '@domain/channel-statistics-summary/ChannelStatisticsSummary.repository'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChannelStatisticsSummaryRepositoryImpl implements ChannelStatisticsSummaryRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  bulkCreate: ChannelStatisticsSummaryRepository['bulkCreate'] = async ({
    data: channels
  }) => {
    const subscriberCounts = channels.map(channel => {
      const {
        basicInfo: { id },
        statistics: { subscriberCount }
      } = channel
      return {
        channelId: id.get(),
        count: subscriberCount
      }
    })
    const videoCounts = channels.map(channel => {
      const {
        basicInfo: { id },
        statistics: { videoCount }
      } = channel
      return {
        channelId: id.get(),
        count: videoCount
      }
    })
    const viewCounts = channels.map(channel => {
      const {
        basicInfo: { id },
        statistics: { viewCount }
      } = channel
      return {
        channelId: id.get(),
        count: viewCount
      }
    })
    await Promise.all([
      this.prismaInfraService.channelSubscriberCountSummary.createMany({
        data: subscriberCounts
      }),
      this.prismaInfraService.channelVideoCountSummary.createMany({
        data: videoCounts
      }),
      this.prismaInfraService.channelViewCountSummary.createMany({
        data: viewCounts
      })
    ])
  }
}
