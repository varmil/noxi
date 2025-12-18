import { Injectable } from '@nestjs/common'
import {
  Count,
  DurationHours,
  StreamVolumeTrend,
  StreamVolumeTrendRepository,
  StreamVolumeTrends
} from '@domain/stream-volume-trend'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface DailyStatsRow {
  date: Date
  stream_count: bigint
  /** PostgreSQL returns high-precision decimals as strings */
  total_duration_hours: string | null
}

@Injectable()
export class StreamVolumeTrendRepositoryImpl
  implements StreamVolumeTrendRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group }
  }: Parameters<StreamVolumeTrendRepository['findAll']>[0]): Promise<StreamVolumeTrends> {
    const groupCondition = group ? `AND "group" = $3` : ''
    const params = group
      ? [dateRange.gte, dateRange.lt, group.get()]
      : [dateRange.gte, dateRange.lt]

    const rows = await this.prismaInfraService.$queryRawUnsafe<DailyStatsRow[]>(
      `
      SELECT
        DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo') as date,
        COUNT(*) as stream_count,
        SUM(
          EXTRACT(EPOCH FROM ("actualEndTime" - "actualStartTime")) / 3600
        ) as total_duration_hours
      FROM "YoutubeStream"
      WHERE status = 'ended'
        AND "actualStartTime" >= $1
        AND "actualStartTime" < $2
        AND "actualEndTime" IS NOT NULL
        ${groupCondition}
      GROUP BY DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo')
      ORDER BY date ASC
      `,
      ...params
    )

    return new StreamVolumeTrends(
      rows.map(
        row =>
          new StreamVolumeTrend({
            date: row.date,
            streamCount: new Count(row.stream_count),
            totalDurationHours: new DurationHours(
              Number(row.total_duration_hours ?? 0)
            )
          })
      )
    )
  }
}
