import { Injectable } from '@nestjs/common'
import { Rank } from '@domain/ranking'
import {
  SubscriberRankPoint,
  SubscriberRankTrend,
  SubscriberRankTrendRepository,
  TotalChannels,
  Trend,
  Week
} from '@domain/subscriber-rank-trend'
import { SubscriberCount } from '@domain/youtube/channel'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface SubscriberRankRow {
  week: Date
  rank: bigint
  total_channels: bigint
  count: number
}

@Injectable()
export class SubscriberRankTrendRepositoryImpl
  implements SubscriberRankTrendRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findByChannelId({
    channelId,
    since
  }: Parameters<
    SubscriberRankTrendRepository['findByChannelId']
  >[0]): Promise<SubscriberRankTrend> {
    const rows = await this.prismaInfraService.$queryRawUnsafe<
      SubscriberRankRow[]
    >(
      `
      WITH weekly_snapshots AS (
        SELECT
          date_trunc('week', "createdAt") as week,
          "channelId",
          count,
          ROW_NUMBER() OVER (
            PARTITION BY "channelId", date_trunc('week', "createdAt")
            ORDER BY "createdAt" DESC
          ) as rn
        FROM "ChannelSubscriberCountSummary"
        WHERE "createdAt" >= $1
      ),
      weekly_latest AS (
        SELECT week, "channelId", count
        FROM weekly_snapshots
        WHERE rn = 1
      ),
      ranked AS (
        SELECT week, "channelId", count,
          RANK() OVER (PARTITION BY week ORDER BY count DESC) as rank,
          COUNT(*) OVER (PARTITION BY week) as total_channels
        FROM weekly_latest
      )
      SELECT week, rank, total_channels, count
      FROM ranked
      WHERE "channelId" = $2
      ORDER BY week
      `,
      since,
      channelId.get()
    )

    const points = rows.map(
      row =>
        new SubscriberRankPoint({
          week: new Week(row.week),
          rank: new Rank(row.rank),
          totalChannels: new TotalChannels(row.total_channels),
          subscriberCount: new SubscriberCount(row.count)
        })
    )

    const trend = this.calculateTrend(points)

    return new SubscriberRankTrend({ trend, points })
  }

  private calculateTrend(points: SubscriberRankPoint[]): Trend {
    if (points.length <= 1) {
      return new Trend('stable')
    }

    const first = points[0]
    const last = points[points.length - 1]
    const firstPct = first.rank.get() / first.totalChannels.get()
    const lastPct = last.rank.get() / last.totalChannels.get()

    const diff = lastPct - firstPct
    if (diff <= -0.05) {
      return new Trend('upward')
    } else if (diff >= 0.05) {
      return new Trend('downward')
    }
    return new Trend('stable')
  }
}
