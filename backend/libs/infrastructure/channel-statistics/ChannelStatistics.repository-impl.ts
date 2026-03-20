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

      // diff = GREATEST(期間内diff, 前期間とのdiff)
      //   期間内diff: 期間内の最後 - 最初（weekly/monthly/yearly で有効）
      //   前期間diff: 期間内の最後 - 前期間の最後（daily で有効）
      // GREATEST で両方カバーし、interval による分岐を不要にする
      const rows = await this.prismaInfraService.$queryRawUnsafe<
        AggregatedRow[]
      >(
        `
        WITH grouped AS (
          SELECT
            DATE_TRUNC('${dateTrunc}', "createdAt" AT TIME ZONE 'Asia/Tokyo')::date AS date,
            (ARRAY_AGG("count" ORDER BY "createdAt" DESC))[1] AS total,
            (ARRAY_AGG("count" ORDER BY "createdAt" DESC))[1]
              - (ARRAY_AGG("count" ORDER BY "createdAt" ASC))[1] AS intra_diff
          FROM "ChannelSubscriberCountSummary"
          WHERE "channelId" = $1
            AND "createdAt" >= DATE_TRUNC('${dateTrunc}', $2::timestamptz AT TIME ZONE 'Asia/Tokyo')
                                - INTERVAL '2 ${dateTrunc}'
            AND "createdAt" < $3
          GROUP BY DATE_TRUNC('${dateTrunc}', "createdAt" AT TIME ZONE 'Asia/Tokyo')
        ),
        with_diff AS (
          SELECT
            date,
            total,
            GREATEST(
              intra_diff,
              total - LAG(total) OVER (ORDER BY date)
            ) AS diff
          FROM grouped
        )
        SELECT date, total, diff
        FROM with_diff
        WHERE date >= DATE_TRUNC('${dateTrunc}', $2::timestamptz AT TIME ZONE 'Asia/Tokyo')::date
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
