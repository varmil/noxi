import { Injectable } from '@nestjs/common'
import { GroupId } from '@domain/group'
import {
  HyperChat,
  HyperChatId,
  HyperChatRepository,
  HyperChats,
  IsAnonymous,
  LikeCount,
  Message,
  Tier,
  TierValue
} from '@domain/hyper-chat'
import { Amount } from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatRepositoryImpl implements HyperChatRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  create: HyperChatRepository['create'] = async ({ data }) => {
    const row = await this.prismaInfraService.hyperChat.create({
      data: {
        orderId: data.orderId?.get(),
        userId: data.userId.get(),
        channelId: data.channelId.get(),
        group: data.group.get(),
        gender: data.gender.get(),
        tier: data.tier.get(),
        amount: data.amount.get(),
        message: data.message.get(),
        isAnonymous: data.isAnonymous?.get() ?? false
      }
    })

    return this.toDomain(row)
  }

  findById: HyperChatRepository['findById'] = async id => {
    const row = await this.prismaInfraService.hyperChat.findUnique({
      where: { id: id.get() }
    })

    return row ? this.toDomain(row) : null
  }

  findByOrderId: HyperChatRepository['findByOrderId'] = async orderId => {
    const row = await this.prismaInfraService.hyperChat.findUnique({
      where: { orderId: orderId.get() }
    })

    return row ? this.toDomain(row) : null
  }

  findAll: HyperChatRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.hyperChat.findMany({
      where: {
        channelId: where.channelId?.get(),
        userId: where.userId?.get(),
        group: where.group?.get(),
        gender: where.gender?.get(),
        tier: where.tier?.get(),
        isAnonymous: where.isAnonymous?.get(),
        createdAt: where.createdAt
          ? {
              gte: where.createdAt.gte,
              lte: where.createdAt.lte
            }
          : undefined
      },
      include: { user: { include: { userProfile: true } } },
      orderBy,
      take: limit,
      skip: offset
    })

    return new HyperChats(rows.map(row => this.toDomainWithUser(row)))
  }

  count: HyperChatRepository['count'] = async ({ where }) => {
    return await this.prismaInfraService.hyperChat.count({
      where: {
        channelId: where.channelId?.get(),
        userId: where.userId?.get(),
        group: where.group?.get(),
        gender: where.gender?.get(),
        createdAt: where.createdAt
          ? {
              gte: where.createdAt.gte,
              lte: where.createdAt.lte
            }
          : undefined
      }
    })
  }

  sumAmount: HyperChatRepository['sumAmount'] = async ({ where }) => {
    const result = await this.prismaInfraService.hyperChat.aggregate({
      where: {
        channelId: where.channelId?.get(),
        userId: where.userId?.get(),
        group: where.group?.get(),
        gender: where.gender?.get(),
        createdAt: where.createdAt
          ? {
              gte: where.createdAt.gte,
              lte: where.createdAt.lte
            }
          : undefined
      },
      _sum: {
        amount: true
      }
    })

    return result._sum.amount ?? 0
  }

  sumLikeCount: HyperChatRepository['sumLikeCount'] = async ({ where }) => {
    const result = await this.prismaInfraService.hyperChat.aggregate({
      where: {
        channelId: where.channelId?.get(),
        userId: where.userId?.get(),
        group: where.group?.get(),
        gender: where.gender?.get(),
        createdAt: where.createdAt
          ? {
              gte: where.createdAt.gte,
              lte: where.createdAt.lte
            }
          : undefined
      },
      _sum: {
        likeCount: true
      }
    })

    return result._sum.likeCount ?? 0
  }

  countDistinctUsers: HyperChatRepository['countDistinctUsers'] = async ({
    where
  }) => {
    const result = await this.prismaInfraService.hyperChat.groupBy({
      by: ['userId'],
      where: {
        channelId: where.channelId?.get(),
        userId: where.userId?.get(),
        group: where.group?.get(),
        gender: where.gender?.get(),
        createdAt: where.createdAt
          ? {
              gte: where.createdAt.gte,
              lte: where.createdAt.lte
            }
          : undefined
      }
    })

    return result.length
  }

  findRecentByChannelIds: HyperChatRepository['findRecentByChannelIds'] =
    async ({ channelIds }) => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

      const rows = await this.prismaInfraService.hyperChat.findMany({
        where: {
          channelId: { in: channelIds.map(id => id.get()) },
          createdAt: { gte: twentyFourHoursAgo }
        },
        include: { user: { include: { userProfile: true } } },
        orderBy: [{ amount: 'desc' }, { createdAt: 'desc' }]
      })

      const result = new Map<string, HyperChats>()

      // 全channelIdの初期化（空配列）
      for (const channelId of channelIds) {
        result.set(channelId.get(), new HyperChats([]))
      }

      // グループ化
      const grouped = new Map<string, HyperChat[]>()
      for (const row of rows) {
        const channelId = row.channelId
        if (!grouped.has(channelId)) {
          grouped.set(channelId, [])
        }
        grouped.get(channelId)!.push(this.toDomainWithUser(row))
      }

      // HyperChats に変換
      for (const [channelId, hyperChats] of grouped) {
        result.set(channelId, new HyperChats(hyperChats))
      }

      return result
    }

  findLatestPerChannel: HyperChatRepository['findLatestPerChannel'] = async ({
    limit
  }) => {
    // createdAt DESC で多めに取得し、チャンネルごとに最新1件だけ残す
    const rows = await this.prismaInfraService.hyperChat.findMany({
      include: { user: { include: { userProfile: true } } },
      orderBy: { createdAt: 'desc' },
      // 最悪全行が同一チャンネルの場合に備えて多めに取得
      take: limit * 5
    })

    const seen = new Set<string>()
    const unique: typeof rows = []
    for (const row of rows) {
      if (seen.has(row.channelId)) continue
      seen.add(row.channelId)
      unique.push(row)
      if (unique.length >= limit) break
    }

    return new HyperChats(unique.map(row => this.toDomainWithUser(row)))
  }

  delete: HyperChatRepository['delete'] = async id => {
    await this.prismaInfraService.hyperChat.deleteMany({
      where: { id: id.get() }
    })
  }

  private toDomain(row: {
    id: number
    userId: number
    channelId: string
    group: string
    gender: string
    tier: string
    amount: number
    message: string
    isAnonymous: boolean
    likeCount: number
    createdAt: Date
  }): HyperChat {
    return new HyperChat({
      id: new HyperChatId(row.id),
      userId: new UserId(row.userId),
      channelId: new ChannelId(row.channelId),
      group: new GroupId(row.group),
      gender: new Gender(row.gender),
      tier: new Tier(row.tier as TierValue),
      amount: new Amount(row.amount),
      message: new Message(row.message),
      likeCount: new LikeCount(row.likeCount),
      isAnonymous: new IsAnonymous(row.isAnonymous),
      createdAt: row.createdAt,
      author: { name: null, image: null, username: null }
    })
  }

  private toDomainWithUser(row: {
    id: number
    userId: number
    channelId: string
    group: string
    gender: string
    tier: string
    amount: number
    message: string
    isAnonymous: boolean
    likeCount: number
    createdAt: Date
    user: {
      name: string | null
      image: string | null
      userProfile: { username: string } | null
    }
  }): HyperChat {
    return new HyperChat({
      id: new HyperChatId(row.id),
      userId: new UserId(row.userId),
      channelId: new ChannelId(row.channelId),
      group: new GroupId(row.group),
      gender: new Gender(row.gender),
      tier: new Tier(row.tier as TierValue),
      amount: new Amount(row.amount),
      message: new Message(row.message),
      likeCount: new LikeCount(row.likeCount),
      isAnonymous: new IsAnonymous(row.isAnonymous),
      createdAt: row.createdAt,
      author: {
        name: row.user.name,
        image: row.user.image,
        username: row.user.userProfile?.username ?? null
      }
    })
  }
}
