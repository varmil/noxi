import { Injectable } from '@nestjs/common'
import {
  SubscriberCountSummary,
  VideoCountSummaries,
  VideoCountSummary,
  ViewCountSummaries,
  ViewCountSummary, SubscriberCountSummaries 
} from '@domain/channel-statistics-summary'
import { ChannelStatisticsSummaryRepository } from '@domain/channel-statistics-summary/ChannelStatisticsSummary.repository'
import {
  ChannelId,
  SubscriberCount,
  VideoCount,
  ViewCount
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChannelStatisticsSummaryRepositoryImpl
  implements ChannelStatisticsSummaryRepository
{
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

  findSubscriberCountHistories: ChannelStatisticsSummaryRepository['findSubscriberCountHistories'] =
    async ({ where: { channelId, createdAt }, limit, offset }) => {
      const rows =
        await this.prismaInfraService.channelSubscriberCountSummary.findMany({
          where: {
            channelId: channelId.get(),
            createdAt: { gte: createdAt.gte, lte: createdAt.lte }
          },
          orderBy: { createdAt: 'asc' },
          take: limit,
          skip: offset
        })
      return new SubscriberCountSummaries(
        rows.map(
          row =>
            new SubscriberCountSummary({
              channelId: new ChannelId(row.channelId),
              subscriberCount: new SubscriberCount(row.count),
              createdAt: row.createdAt
            })
        )
      )
    }

  findVideoCountHistories: ChannelStatisticsSummaryRepository['findVideoCountHistories'] =
    async ({ where: { channelId, createdAt }, limit, offset }) => {
      const rows =
        await this.prismaInfraService.channelVideoCountSummary.findMany({
          where: {
            channelId: channelId.get(),
            createdAt: { gte: createdAt.gte, lte: createdAt.lte }
          },
          orderBy: { createdAt: 'asc' },
          take: limit,
          skip: offset
        })
      return new VideoCountSummaries(
        rows.map(
          row =>
            new VideoCountSummary({
              channelId: new ChannelId(row.channelId),
              videoCount: new VideoCount(row.count),
              createdAt: row.createdAt
            })
        )
      )
    }

  findViewCountHistories: ChannelStatisticsSummaryRepository['findViewCountHistories'] =
    async ({ where: { channelId, createdAt }, limit, offset }) => {
      const rows =
        await this.prismaInfraService.channelViewCountSummary.findMany({
          where: {
            channelId: channelId.get(),
            createdAt: { gte: createdAt.gte, lte: createdAt.lte }
          },
          orderBy: { createdAt: 'asc' },
          take: limit,
          skip: offset
        })
      return new ViewCountSummaries(
        rows.map(
          row =>
            new ViewCountSummary({
              channelId: new ChannelId(row.channelId),
              viewCount: new ViewCount(row.count),
              createdAt: row.createdAt
            })
        )
      )
    }
}
