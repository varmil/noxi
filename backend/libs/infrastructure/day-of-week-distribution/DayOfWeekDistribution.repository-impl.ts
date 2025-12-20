import { Injectable } from '@nestjs/common'
import { MedianViewers } from '@domain/concurrent-viewer-trend'
import {
  DayOfWeek,
  DayOfWeekDistribution,
  DayOfWeekDistributionRepository,
  DayOfWeekDistributions
} from '@domain/day-of-week-distribution'
import { Count } from '@domain/stream-volume-trend'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface DayOfWeekRow {
  day_of_week: number
  /** PostgreSQL SUM(bigint) returns bigint as string */
  stream_count: bigint | string
  /** PostgreSQL PERCENTILE_CONT returns double precision as string */
  median_viewers: string | null
}

@Injectable()
export class DayOfWeekDistributionRepositoryImpl
  implements DayOfWeekDistributionRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group }
  }: Parameters<DayOfWeekDistributionRepository['findAll']>[0]): Promise<DayOfWeekDistributions> {
    const groupCondition = group ? `AND "group" = $3` : ''
    const params = group
      ? [dateRange.gte, dateRange.lt, group.get()]
      : [dateRange.gte, dateRange.lt]

    const rows = await this.prismaInfraService.$queryRawUnsafe<DayOfWeekRow[]>(
      `
      WITH daily_stats AS (
        SELECT
          DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo') as date,
          EXTRACT(ISODOW FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo') as iso_dow,
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "maxViewerCount") as median_viewers,
          COUNT(*) as stream_count
        FROM "YoutubeStream"
        WHERE status = 'ended'
          AND "actualStartTime" >= $1
          AND "actualStartTime" < $2
          AND "maxViewerCount" > 0
          ${groupCondition}
        GROUP BY
          DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo'),
          EXTRACT(ISODOW FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo')
      )
      SELECT
        (iso_dow - 1)::int as day_of_week,
        SUM(stream_count) as stream_count,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY median_viewers) as median_viewers
      FROM daily_stats
      GROUP BY iso_dow
      ORDER BY iso_dow ASC
      `,
      ...params
    )

    return new DayOfWeekDistributions(
      rows.map(
        row =>
          new DayOfWeekDistribution({
            dayOfWeek: new DayOfWeek(row.day_of_week),
            streamCount: new Count(Number(row.stream_count)),
            medianViewers: new MedianViewers(Number(row.median_viewers ?? 0))
          })
      )
    )
  }
}
