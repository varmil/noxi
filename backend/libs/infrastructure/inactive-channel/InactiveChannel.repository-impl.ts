import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/generated/client'
import { GroupId } from '@domain/group'
import {
  InactiveChannel,
  InactiveChannelRepository,
  InactiveChannels
} from '@domain/inactive-channel'
import {
  ChannelId,
  ChannelTitle,
  SubscriberCount,
  ThumbnailUrl
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface InactiveChannelRow {
  id: string
  title: string
  group: string
  subscriberCount: number
  thumbnails: Prisma.JsonValue
  last_stream_date: Date | null
}

@Injectable()
export class InactiveChannelRepositoryImpl implements InactiveChannelRepository {
  constructor(private readonly prisma: PrismaInfraService) {}

  async findInactiveChannels(args: {
    inactiveMonths: number
  }): Promise<InactiveChannels> {
    const rows = await this.prisma.$queryRaw<InactiveChannelRow[]>`
      SELECT
        c.id,
        c.title,
        c."group",
        c."subscriberCount",
        c.thumbnails,
        MAX(ys."actualEndTime") AS last_stream_date
      FROM "Channel" c
      LEFT JOIN "YoutubeStream" ys ON c.id = ys."channelId"
        AND ys.status = 'ended'
      GROUP BY c.id, c.title, c."group", c."subscriberCount", c.thumbnails
      HAVING MAX(ys."actualEndTime") < NOW() - INTERVAL '1 month' * ${args.inactiveMonths}
        OR MAX(ys."actualEndTime") IS NULL
      ORDER BY last_stream_date ASC NULLS FIRST
    `

    return new InactiveChannels(rows.map(row => this.toDomain(row)))
  }

  async deleteChannelCompletely(channelId: ChannelId): Promise<void> {
    const id = channelId.get()

    // トランザクションで全ての関連データを削除
    await this.prisma.$transaction(async tx => {
      // 1. Cascade されないテーブルを先に削除
      // YoutubeStreamSuperSticker (videoId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "YoutubeStreamSuperSticker"
        WHERE "videoId" IN (
          SELECT "videoId" FROM "YoutubeStream" WHERE "channelId" = ${id}
        )
      `

      // StreamMembership (videoId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "StreamMembership"
        WHERE "videoId" IN (
          SELECT "videoId" FROM "YoutubeStream" WHERE "channelId" = ${id}
        )
      `

      // NextContinuation (videoId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "NextContinuation"
        WHERE "videoId" IN (
          SELECT "videoId" FROM "YoutubeStream" WHERE "channelId" = ${id}
        )
      `

      // YoutubeStreamViewerCount (videoId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "YoutubeStreamViewerCount"
        WHERE "videoId" IN (
          SELECT "videoId" FROM "YoutubeStream" WHERE "channelId" = ${id}
        )
      `

      // StreamChatDeletingQueue (videoId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "StreamChatDeletingQueue"
        WHERE "videoId" IN (
          SELECT "videoId" FROM "YoutubeStream" WHERE "channelId" = ${id}
        )
      `

      // MembershipPrice (channelId で紐づき、relation なし)
      await tx.$executeRaw`
        DELETE FROM "MembershipPrice" WHERE "channelId" = ${id}
      `

      // 2. Channel を削除（残りは Cascade で自動削除）
      // - YoutubeStream → YoutubeStreamSuperChat も連鎖削除
      // - YoutubeStreamSupersBundle
      // - YoutubeStreamSupersSummary
      // - YoutubeStreamSupersSummaryLatest
      // - StreamMembershipBundle
      // - ChannelMembershipSummary
      // - ChannelMembershipSummaryLatest
      // - ChannelSupersRanking
      // - ChannelSubscriberCountSummary
      // - ChannelVideoCountSummary
      // - ChannelViewCountSummary
      await tx.channel.delete({ where: { id } })
    })
  }

  private toDomain(row: InactiveChannelRow): InactiveChannel {
    const thumbnails = row.thumbnails as { default?: { url?: string } } | null
    const thumbnailUrlString = thumbnails?.default?.url ?? null

    return new InactiveChannel({
      id: new ChannelId(row.id),
      title: new ChannelTitle(row.title),
      group: new GroupId(row.group),
      subscriberCount: new SubscriberCount(row.subscriberCount),
      thumbnailUrl: thumbnailUrlString ? new ThumbnailUrl(thumbnailUrlString) : null,
      lastStreamDate: row.last_stream_date
    })
  }
}
