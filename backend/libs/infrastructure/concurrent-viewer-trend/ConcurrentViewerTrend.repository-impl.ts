import { Injectable } from '@nestjs/common'
import {
  MedianViewers,
  ConcurrentViewerTrend,
  ConcurrentViewerTrendRepository,
  ConcurrentViewerTrends
} from '@domain/concurrent-viewer-trend'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface DailyMedianRow {
  date: Date
  /** PostgreSQL PERCENTILE_CONT returns double precision as string */
  median_viewers: string | null
}

@Injectable()
export class ConcurrentViewerTrendRepositoryImpl
  implements ConcurrentViewerTrendRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group }
  }: Parameters<ConcurrentViewerTrendRepository['findAll']>[0]): Promise<ConcurrentViewerTrends> {
    const groupCondition = group ? `AND "group" = $3` : ''
    const params = group
      ? [dateRange.gte, dateRange.lt, group.get()]
      : [dateRange.gte, dateRange.lt]

    const rows = await this.prismaInfraService.$queryRawUnsafe<DailyMedianRow[]>(
      `
      SELECT
        DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo') as date,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "maxViewerCount") as median_viewers
      FROM "YoutubeStream"
      WHERE status = 'ended'
        AND "actualStartTime" >= $1
        AND "actualStartTime" < $2
        AND "maxViewerCount" > 0
        ${groupCondition}
      GROUP BY DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo')
      ORDER BY date ASC
      `,
      ...params
    )

    return new ConcurrentViewerTrends(
      rows.map(
        row =>
          new ConcurrentViewerTrend({
            date: row.date,
            medianViewers: new MedianViewers(Number(row.median_viewers ?? 0))
          })
      )
    )
  }
}
