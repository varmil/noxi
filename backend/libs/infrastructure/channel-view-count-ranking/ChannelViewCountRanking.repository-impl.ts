import { Injectable } from '@nestjs/common'
import {
  ChannelViewCountRanking,
  ChannelViewCountRankingRepository,
  ChannelViewCountRankings
} from '@domain/channel-view-count-ranking'
import { GroupId, GroupName } from '@domain/group'
import { Diff, Rank } from '@domain/ranking'
import {
  ChannelId,
  ChannelTitle,
  ThumbnailUrl,
  ViewCount
} from '@domain/youtube/channel'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface ChannelViewCountRankingRow {
  rank: bigint
  channel_id: string
  channel_title: string
  thumbnail_url: string | null
  group_id: string
  group_name: string
  diff: bigint
  view_count: bigint
}

@Injectable()
export class ChannelViewCountRankingRepositoryImpl
  implements ChannelViewCountRankingRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { dateRange, group },
    limit = 20
  }: Parameters<ChannelViewCountRankingRepository['findAll']>[0]): Promise<ChannelViewCountRankings> {
    const params: unknown[] = [dateRange.gte, dateRange.lt, limit]
    let groupCondition = ''

    if (group) {
      params.push(group.get())
      groupCondition = `AND c."group" = $${params.length}`
    }

    const rows = await this.prismaInfraService.$queryRawUnsafe<
      ChannelViewCountRankingRow[]
    >(
      `
      WITH latest_records AS (
        SELECT DISTINCT ON ("channelId")
          "channelId",
          "count",
          "createdAt"
        FROM "ChannelViewCountSummary"
        WHERE "createdAt" >= $1
          AND "createdAt" < $2
        ORDER BY "channelId", "createdAt" DESC
      ),
      earliest_records AS (
        SELECT DISTINCT ON ("channelId")
          "channelId",
          "count",
          "createdAt"
        FROM "ChannelViewCountSummary"
        WHERE "createdAt" >= $1
          AND "createdAt" < $2
        ORDER BY "channelId", "createdAt" ASC
      ),
      growth_data AS (
        SELECT
          l."channelId",
          l."count" as latest_count,
          (l."count" - e."count") as diff
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
        g.latest_count as view_count
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

    return new ChannelViewCountRankings(
      rows.map(
        row =>
          new ChannelViewCountRanking({
            rank: new Rank(row.rank),
            channelId: new ChannelId(row.channel_id),
            channelTitle: new ChannelTitle(row.channel_title),
            thumbnailUrl: row.thumbnail_url
              ? new ThumbnailUrl(row.thumbnail_url)
              : null,
            groupId: new GroupId(row.group_id),
            groupName: new GroupName(row.group_name),
            diff: new Diff(row.diff),
            viewCount: new ViewCount(row.view_count)
          })
      )
    )
  }
}
