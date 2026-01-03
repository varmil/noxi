import { Injectable } from '@nestjs/common'
import {
  GoldenTime,
  GoldenTimeRepository,
  GoldenTimes,
  Hour
} from '@domain/golden-time'
import { DayOfWeek } from '@domain/lib/datetime'
import { Count } from '@domain/stream-volume-trend'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface GoldenTimeRow {
  hour: number
  day_of_week: number
  /** PostgreSQL COUNT returns bigint */
  stream_count: bigint
}

@Injectable()
export class GoldenTimeRepositoryImpl implements GoldenTimeRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group }
  }: Parameters<GoldenTimeRepository['findAll']>[0]): Promise<GoldenTimes> {
    const groupCondition = group ? `AND "group" = $3` : ''
    const params = group
      ? [dateRange.gte, dateRange.lt, group.get()]
      : [dateRange.gte, dateRange.lt]

    const rows = await this.prismaInfraService.$queryRawUnsafe<GoldenTimeRow[]>(
      `
      SELECT
        EXTRACT(HOUR FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo')::int as hour,
        (EXTRACT(ISODOW FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo') - 1)::int as day_of_week,
        COUNT(*) as stream_count
      FROM "YoutubeStream"
      WHERE status = 'ended'
        AND "actualStartTime" >= $1
        AND "actualStartTime" < $2
        ${groupCondition}
      GROUP BY
        EXTRACT(HOUR FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo'),
        EXTRACT(ISODOW FROM "actualStartTime" AT TIME ZONE 'Asia/Tokyo')
      ORDER BY hour ASC, day_of_week ASC
      `,
      ...params
    )

    return new GoldenTimes(
      rows.map(
        row =>
          new GoldenTime({
            hour: new Hour(row.hour),
            dayOfWeek: new DayOfWeek(row.day_of_week),
            streamCount: new Count(row.stream_count)
          })
      )
    )
  }
}
