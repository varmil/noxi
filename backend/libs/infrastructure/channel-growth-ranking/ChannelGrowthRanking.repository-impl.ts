import { Injectable } from '@nestjs/common'
import {
  ChannelGrowthRanking,
  ChannelGrowthRankingRepository,
  ChannelGrowthRankings,
  Diff,
  Rank,
  Rate
} from '@domain/channel-growth-ranking'
import { GroupId, GroupName } from '@domain/group'
import {
  ChannelId,
  ChannelTitle,
  SubscriberCount,
  ThumbnailUrl
} from '@domain/youtube/channel'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface ChannelGrowthRankingRow {
  rank: bigint
  channel_id: string
  channel_title: string
  thumbnail_url: string | null
  group_id: string
  group_name: string
  diff: bigint
  /** PostgreSQL ROUND returns string */
  rate: string | null
  subscriber_count: number
}

@Injectable()
export class ChannelGrowthRankingRepositoryImpl
  implements ChannelGrowthRankingRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group },
    limit = 20
  }: Parameters<ChannelGrowthRankingRepository['findAll']>[0]): Promise<ChannelGrowthRankings> {
    const groupCondition = group ? `AND c."group" = $4` : ''
    const params = group
      ? [dateRange.gte, dateRange.lt, limit, group.get()]
      : [dateRange.gte, dateRange.lt, limit]

    const rows = await this.prismaInfraService.$queryRawUnsafe<
      ChannelGrowthRankingRow[]
    >(
      `
      WITH latest_records AS (
        SELECT DISTINCT ON ("channelId")
          "channelId",
          "count",
          "createdAt"
        FROM "ChannelSubscriberCountSummary"
        WHERE "createdAt" >= $1
          AND "createdAt" < $2
        ORDER BY "channelId", "createdAt" DESC
      ),
      earliest_records AS (
        SELECT DISTINCT ON ("channelId")
          "channelId",
          "count",
          "createdAt"
        FROM "ChannelSubscriberCountSummary"
        WHERE "createdAt" >= $1
          AND "createdAt" < $2
        ORDER BY "channelId", "createdAt" ASC
      ),
      growth_data AS (
        SELECT
          l."channelId",
          l."count" as latest_count,
          e."count" as earliest_count,
          (l."count" - e."count") as diff,
          CASE
            WHEN e."count" > 0 THEN
              ROUND(((l."count" - e."count")::numeric / e."count"::numeric) * 100, 2)
            ELSE 0
          END as rate
        FROM latest_records l
        INNER JOIN earliest_records e ON l."channelId" = e."channelId"
        WHERE l."count" > e."count"
      )
      SELECT
        ROW_NUMBER() OVER (ORDER BY g.diff DESC) as rank,
        g."channelId" as channel_id,
        c."title" as channel_title,
        (c."thumbnails"::json->'medium'->>'url') as thumbnail_url,
        gr."id" as group_id,
        gr."name" as group_name,
        g.diff,
        g.rate,
        g.latest_count as subscriber_count
      FROM growth_data g
      INNER JOIN "Channel" c ON g."channelId" = c."id"
      INNER JOIN "Group" gr ON c."group" = gr."id"
      WHERE 1=1
        ${groupCondition}
      ORDER BY g.diff DESC
      LIMIT $3
      `,
      ...params
    )

    return new ChannelGrowthRankings(
      rows.map(
        row =>
          new ChannelGrowthRanking({
            rank: new Rank(row.rank),
            channelId: new ChannelId(row.channel_id),
            channelTitle: new ChannelTitle(row.channel_title),
            thumbnailUrl: row.thumbnail_url
              ? new ThumbnailUrl(row.thumbnail_url)
              : null,
            groupId: new GroupId(row.group_id),
            groupName: new GroupName(row.group_name),
            diff: new Diff(row.diff),
            rate: new Rate(row.rate ?? 0),
            subscriberCount: new SubscriberCount(row.subscriber_count)
          })
      )
    )
  }
}
