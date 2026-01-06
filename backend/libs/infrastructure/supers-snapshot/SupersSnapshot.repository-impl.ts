import { Injectable } from '@nestjs/common'
import { AmountMicros } from '@domain/lib/currency'
import {
  SupersSnapshotRepository,
  SupersSnapshot,
  SupersSnapshots,
  SnapshotPeriod
} from '@domain/supers-snapshot'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface RankingRow {
  channelId: string
  amountMicros: bigint
  createdAt: Date
}

@Injectable()
export class SupersSnapshotRepositoryImpl implements SupersSnapshotRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findRanking({
    where: { targetDate, period, group, gender },
    limit = 30,
    offset = 0
  }: Parameters<SupersSnapshotRepository['findRanking']>[0]): Promise<SupersSnapshots> {
    const amountColumn = this.getAmountColumn(period)

    // group, gender による絞り込み条件を構築
    const conditions: string[] = []
    const params: (Date | string | number)[] = [targetDate]

    if (group) {
      conditions.push(`c."group" = $${params.length + 1}`)
      params.push(group.get())
    }
    if (gender) {
      conditions.push(`c."gender" = $${params.length + 1}`)
      params.push(gender.get())
    }

    const whereClause =
      conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : ''

    // 指定日付付近（2日以内）の最新レコードを各チャンネルごとに取得
    // そのレコードの thisWeek or thisMonth でソート
    const query = `
      WITH RankedSummaries AS (
        SELECT
          s."channelId",
          s."${amountColumn}" as "amountMicros",
          s."createdAt",
          ROW_NUMBER() OVER (PARTITION BY s."channelId" ORDER BY s."createdAt" DESC) as rn
        FROM "YoutubeStreamSupersSummary" s
        INNER JOIN "Channel" c ON s."channelId" = c."id"
        WHERE s."createdAt" <= $1
          AND s."createdAt" >= $1 - INTERVAL '2 days'
          AND s."${amountColumn}" > 0
          ${whereClause}
      )
      SELECT "channelId", "amountMicros", "createdAt"
      FROM RankedSummaries
      WHERE rn = 1
      ORDER BY "amountMicros" DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    const rows = await this.prismaInfraService.$queryRawUnsafe<RankingRow[]>(
      query,
      ...params
    )

    return new SupersSnapshots(
      rows.map(
        row =>
          new SupersSnapshot({
            channelId: new ChannelId(row.channelId),
            amountMicros: new AmountMicros(row.amountMicros),
            createdAt: row.createdAt
          })
      )
    )
  }

  async countRanking({
    where: { targetDate, period, group, gender }
  }: Parameters<SupersSnapshotRepository['countRanking']>[0]): Promise<number> {
    const amountColumn = this.getAmountColumn(period)

    // group, gender による絞り込み条件を構築
    const conditions: string[] = []
    const params: (Date | string)[] = [targetDate]

    if (group) {
      conditions.push(`c."group" = $${params.length + 1}`)
      params.push(group.get())
    }
    if (gender) {
      conditions.push(`c."gender" = $${params.length + 1}`)
      params.push(gender.get())
    }

    const whereClause =
      conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : ''

    // 指定日付付近（2日以内）の各チャンネルごとの最新レコード数をカウント
    const query = `
      WITH RankedSummaries AS (
        SELECT
          s."channelId",
          ROW_NUMBER() OVER (PARTITION BY s."channelId" ORDER BY s."createdAt" DESC) as rn
        FROM "YoutubeStreamSupersSummary" s
        INNER JOIN "Channel" c ON s."channelId" = c."id"
        WHERE s."createdAt" <= $1
          AND s."createdAt" >= $1 - INTERVAL '2 days'
          AND s."${amountColumn}" > 0
          ${whereClause}
      )
      SELECT COUNT(*) as count
      FROM RankedSummaries
      WHERE rn = 1
    `

    const rows = await this.prismaInfraService.$queryRawUnsafe<
      { count: bigint }[]
    >(query, ...params)

    return Number(rows[0]?.count ?? 0)
  }

  private getAmountColumn(period: SnapshotPeriod): string {
    switch (period) {
      case 'weekly':
        return 'thisWeek'
      case 'monthly':
        return 'thisMonth'
    }
  }
}
