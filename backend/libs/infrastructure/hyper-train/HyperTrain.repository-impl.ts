import { Injectable } from '@nestjs/common'
import { GroupId } from '@domain/group'
import {
  HyperTrain,
  HyperTrainContributor,
  HyperTrainContributors,
  HyperTrainId,
  HyperTrainRepository,
  HyperTrains,
  Level,
  Point,
  TotalPoint
} from '@domain/hyper-train'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

interface TrainRow {
  id: number
  channelId: string
  group: string
  level: number
  totalPoint: number
  startedAt: Date
  expiresAt: Date
  contributions: {
    userId: number
    point: number
  }[]
}

@Injectable()
export class HyperTrainRepositoryImpl implements HyperTrainRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findOne: HyperTrainRepository['findOne'] = async ({ where }) => {
    const row = await this.prismaInfraService.hyperTrain.findFirst({
      where: {
        id: where.id?.get(),
        channelId: where.channelId?.get(),
        expiresAt: where.expiresAt?.gt ? { gt: where.expiresAt.gt } : undefined
      },
      include: {
        contributions: {
          include: { hyperTrain: false },
          orderBy: { point: 'desc' }
        }
      }
    })

    if (!row) return null

    const userMap = await this.fetchUserMap(row.contributions)
    return this.toDomainWithUsers(row, userMap)
  }

  findAll: HyperTrainRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.hyperTrain.findMany({
      where: {
        channelId: where.channelId?.get(),
        group: where.group?.get(),
        expiresAt: where.expiresAt?.gt ? { gt: where.expiresAt.gt } : undefined
      },
      include: {
        contributions: {
          orderBy: { point: 'desc' }
        }
      },
      orderBy,
      take: limit,
      skip: offset
    })

    const allContributions = rows.flatMap(row => row.contributions)
    const userMap = await this.fetchUserMap(allContributions)

    return new HyperTrains(
      rows.map(row => this.toDomainWithUsers(row, userMap))
    )
  }

  findBestByChannelId: HyperTrainRepository['findBestByChannelId'] = async (
    channelId
  ) => {
    const row = await this.prismaInfraService.hyperTrain.findFirst({
      where: {
        channelId: channelId.get(),
        expiresAt: { lt: new Date() }
      },
      orderBy: [{ level: 'desc' }, { totalPoint: 'desc' }],
      include: {
        contributions: {
          orderBy: { point: 'desc' }
        }
      }
    })

    if (!row) return null

    const userMap = await this.fetchUserMap(row.contributions)
    return this.toDomainWithUsers(row, userMap)
  }

  countRecentUniqueUsers: HyperTrainRepository['countRecentUniqueUsers'] =
    async (channelId, withinMinutes) => {
      const since = new Date(Date.now() - withinMinutes * 60 * 1000)

      const result = await this.prismaInfraService.hyperChat.groupBy({
        by: ['userId'],
        where: {
          channelId: channelId.get(),
          createdAt: { gte: since }
        }
      })

      return result.length
    }

  create: HyperTrainRepository['create'] = async ({ data }) => {
    const row = await this.prismaInfraService.hyperTrain.create({
      data: {
        channelId: data.channelId.get(),
        group: data.group.get(),
        level: data.level.get(),
        totalPoint: data.totalPoint.get(),
        startedAt: data.startedAt,
        expiresAt: data.expiresAt
      }
    })

    return new HyperTrainId(row.id)
  }

  addContribution: HyperTrainRepository['addContribution'] = async ({
    data
  }) => {
    await this.prismaInfraService.hyperTrainContribution.create({
      data: {
        hyperTrainId: data.hyperTrainId.get(),
        hyperChatId: data.hyperChatId.get(),
        userId: data.userId.get(),
        point: data.point.get()
      }
    })
  }

  update: HyperTrainRepository['update'] = async ({ id, data }) => {
    await this.prismaInfraService.hyperTrain.update({
      where: { id: id.get() },
      data: {
        level: data.level.get(),
        totalPoint: data.totalPoint.get(),
        expiresAt: data.expiresAt
      }
    })
  }

  private async fetchUserMap(
    contributions: { userId: number }[]
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
    const userIds = [...new Set(contributions.map(c => c.userId))]
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

  /** ユーザー情報付き＆同一ユーザーのポイントを合算 */
  private toDomainWithUsers(
    row: TrainRow,
    userMap: Map<
      number,
      {
        id: number
        name: string | null
        image: string | null
        username: string | null
      }
    >
  ): HyperTrain {
    // 同一ユーザーのポイントを合算
    const aggregated = new Map<number, number>()
    for (const c of row.contributions) {
      aggregated.set(c.userId, (aggregated.get(c.userId) ?? 0) + c.point)
    }

    // ポイント降順でソート
    const sorted = [...aggregated.entries()].sort(([, a], [, b]) => b - a)

    const contributors = new HyperTrainContributors(
      sorted.map(([userId, point]) => {
        const user = userMap.get(userId)
        return new HyperTrainContributor({
          userId: new UserId(userId),
          point: new Point(point),
          name: user?.name ?? null,
          image: user?.image ?? null,
          username: user?.username ?? null
        })
      })
    )

    return new HyperTrain({
      id: new HyperTrainId(row.id),
      channelId: new ChannelId(row.channelId),
      group: new GroupId(row.group),
      level: new Level(row.level),
      totalPoint: new TotalPoint(row.totalPoint),
      startedAt: row.startedAt,
      expiresAt: row.expiresAt,
      contributors
    })
  }
}
