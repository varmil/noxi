import { Injectable } from '@nestjs/common'
import { Amount } from '@domain/hyper-chat-order'
import {
  AnonymousPoster,
  HyperChatRankingRepository,
  Poster,
  PosterRanking
} from '@domain/hyper-chat-ranking'
import { UserId } from '@domain/user'
import { Image, Name, Username } from '@domain/user-profile'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface PosterRow {
  userId: number
  totalAmount: bigint
}

interface AnonymousRow {
  count: bigint
  totalAmount: bigint
}

@Injectable()
export class HyperChatRankingRepositoryImpl
  implements HyperChatRankingRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findPosterRanking: HyperChatRankingRepository['findPosterRanking'] = async ({
    channelId,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.$queryRaw<PosterRow[]>`
      SELECT "userId", SUM("amount")::int AS "totalAmount"
      FROM "HyperChat"
      WHERE "channelId" = ${channelId.get()} AND "isAnonymous" = false
      GROUP BY "userId"
      ORDER BY "totalAmount" DESC, MIN("createdAt") ASC
      LIMIT ${limit} OFFSET ${offset ?? 0}
    `

    const userMap = await this.fetchUserMap(rows)

    const posters = rows
      .map(row => {
        const user = userMap.get(Number(row.userId))
        if (!user || !user.name || !user.image || !user.username) return null
        return new Poster({
          userId: new UserId(Number(row.userId)),
          totalAmount: new Amount(Number(row.totalAmount)),
          name: new Name(user.name),
          image: new Image(user.image),
          username: new Username(user.username)
        })
      })
      .filter((p): p is Poster => p !== null)

    return new PosterRanking(posters)
  }

  countPosterRanking: HyperChatRankingRepository['countPosterRanking'] =
    async ({ channelId }) => {
      const result = await this.prismaInfraService.$queryRaw<
        { count: bigint }[]
      >`
      SELECT COUNT(DISTINCT "userId") AS "count"
      FROM "HyperChat"
      WHERE "channelId" = ${channelId.get()} AND "isAnonymous" = false
    `

      return Number(result[0].count)
    }

  findAnonymousPoster: HyperChatRankingRepository['findAnonymousPoster'] =
    async ({ channelId }) => {
      const result = await this.prismaInfraService.$queryRaw<AnonymousRow[]>`
      SELECT COUNT(*) AS "count", COALESCE(SUM("amount"), 0)::int AS "totalAmount"
      FROM "HyperChat"
      WHERE "channelId" = ${channelId.get()} AND "isAnonymous" = true
    `

      if (Number(result[0].count) === 0) return null

      return new AnonymousPoster({
        totalAmount: new Amount(Number(result[0].totalAmount))
      })
    }

  private async fetchUserMap(
    rows: { userId: number }[]
  ): Promise<
    Map<
      number,
      {
        id: number
        name: string | null
        image: string | null
        username: string | null
      }
    >
  > {
    const userIds = [...new Set(rows.map(r => Number(r.userId)))]
    if (userIds.length === 0) return new Map()

    const users = await this.prismaInfraService.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
        image: true,
        userProfile: { select: { username: true } }
      }
    })

    return new Map(
      users.map(u => [
        u.id,
        {
          id: u.id,
          name: u.name,
          image: u.image,
          username: u.userProfile?.username ?? null
        }
      ])
    )
  }
}
