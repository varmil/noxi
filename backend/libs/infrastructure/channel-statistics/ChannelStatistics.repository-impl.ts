import { Injectable } from '@nestjs/common'
import { ChannelStatisticsRepository } from '@domain/channel-statistics/ChannelStatistics.repository'
import {
  CountHistories,
  CountHistory,
  CountHistoryDate,
  CountHistoryTotal,
  CountHistoryDiff
} from '@domain/channel-statistics/count-history'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface AggregatedRow {
  date: Date
  total: string | null
  diff: string | null
}

@Injectable()
export class ChannelStatisticsRepositoryImpl
  implements ChannelStatisticsRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  bulkCreate: ChannelStatisticsRepository['bulkCreate'] = async ({
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

  findAggregatedSubscriberCounts: ChannelStatisticsRepository['findAggregatedSubscriberCounts'] =
    async ({ where: { channelId, gte, lt }, interval }) => {
      const dateTrunc = interval.toDateTrunc()

      const rows = await this.prismaInfraService.$queryRawUnsafe<
        AggregatedRow[]
      >(
        `
        SELECT
          DATE_TRUNC('${dateTrunc}', "createdAt" AT TIME ZONE 'Asia/Tokyo')::date AS date,
          (ARRAY_AGG("count" ORDER BY "createdAt" DESC))[1] AS total,
          (ARRAY_AGG("count" ORDER BY "createdAt" DESC))[1]
            - (ARRAY_AGG("count" ORDER BY "createdAt" ASC))[1] AS diff
        FROM "ChannelSubscriberCountSummary"
        WHERE "channelId" = $1
          AND "createdAt" >= $2
          AND "createdAt" < $3
        GROUP BY DATE_TRUNC('${dateTrunc}', "createdAt" AT TIME ZONE 'Asia/Tokyo')
        ORDER BY date ASC
        `,
        channelId.get(),
        gte,
        lt
      )

      return new CountHistories(
        rows.map(
          row =>
            new CountHistory({
              date: new CountHistoryDate(this.formatDate(row.date)),
              total: new CountHistoryTotal(Number(row.total ?? 0)),
              diff: new CountHistoryDiff(Number(row.diff ?? 0))
            })
        )
      )
    }

  private formatDate(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
}
