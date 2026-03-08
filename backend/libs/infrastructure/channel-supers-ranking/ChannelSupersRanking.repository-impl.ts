import { Injectable } from '@nestjs/common'
import {
  ChannelSupersRanking,
  ChannelSupersRankingRepository,
  ChannelSupersRankings
} from '@domain/channel-supers-ranking'
import { GroupId, GroupName } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency/AmountMicros.vo'
import { Rank } from '@domain/ranking'
import {
  ChannelId,
  ChannelTitle,
  ThumbnailUrl
} from '@domain/youtube/channel'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface ChannelSupersRankingRow {
  rank: bigint
  channel_id: string
  channel_title: string
  thumbnail_url: string | null
  group_id: string
  group_name: string
  current_amount: string | null
  previous_amount: string | null
}

@Injectable()
export class ChannelSupersRankingRepositoryImpl
  implements ChannelSupersRankingRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { currentDate, previousDate, period, group },
    limit = 20
  }: Parameters<ChannelSupersRankingRepository['findAll']>[0]): Promise<ChannelSupersRankings> {
    const amountColumn = period === 'weekly' ? 'last7Days' : 'thisMonth'
    const params: unknown[] = [currentDate, previousDate, limit]
    let groupCondition = ''

    if (group) {
      params.push(group.get())
      groupCondition = `AND c."group" = $${params.length}`
    }

    const rows = await this.prismaInfraService.$queryRawUnsafe<
      ChannelSupersRankingRow[]
    >(
      `
      WITH current_ranked AS (
        SELECT s."channelId", s."${amountColumn}" as amount,
          ROW_NUMBER() OVER (PARTITION BY s."channelId" ORDER BY s."createdAt" DESC) as rn
        FROM "YoutubeStreamSupersSummary" s
        INNER JOIN "Channel" c ON s."channelId" = c."id"
        WHERE s."createdAt" <= $1 AND s."createdAt" >= $1 - INTERVAL '2 days'
          AND s."${amountColumn}" > 0
          ${groupCondition}
      ),
      previous_ranked AS (
        SELECT s."channelId", s."${amountColumn}" as amount,
          ROW_NUMBER() OVER (PARTITION BY s."channelId" ORDER BY s."createdAt" DESC) as rn
        FROM "YoutubeStreamSupersSummary" s
        INNER JOIN "Channel" c ON s."channelId" = c."id"
        WHERE s."createdAt" <= $2 AND s."createdAt" >= $2 - INTERVAL '2 days'
          ${groupCondition}
      )
      SELECT
        ROW_NUMBER() OVER (ORDER BY cur.amount DESC) as rank,
        cur."channelId" as channel_id,
        c."title" as channel_title,
        (c."thumbnails"::json->'medium'->>'url') as thumbnail_url,
        gr."id" as group_id,
        gr."name" as group_name,
        cur.amount as current_amount,
        COALESCE(prev.amount, 0) as previous_amount
      FROM current_ranked cur
      INNER JOIN "Channel" c ON cur."channelId" = c."id"
      INNER JOIN "Group" gr ON c."group" = gr."id"
      LEFT JOIN previous_ranked prev ON cur."channelId" = prev."channelId" AND prev.rn = 1
      WHERE cur.rn = 1
      ORDER BY cur.amount DESC
      LIMIT $3
      `,
      ...params
    )

    return new ChannelSupersRankings(
      rows.map(
        row =>
          new ChannelSupersRanking({
            rank: new Rank(row.rank),
            channelId: new ChannelId(row.channel_id),
            channelTitle: new ChannelTitle(row.channel_title),
            thumbnailUrl: row.thumbnail_url
              ? new ThumbnailUrl(row.thumbnail_url)
              : null,
            groupId: new GroupId(row.group_id),
            groupName: new GroupName(row.group_name),
            currentAmount: new AmountMicros(row.current_amount ?? '0'),
            previousAmount: new AmountMicros(row.previous_amount ?? '0')
          })
      )
    )
  }
}
