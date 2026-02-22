import { Injectable } from '@nestjs/common'
import { GroupId } from '@domain/group'
import {
  HyperChat,
  HyperChatId,
  HyperChats,
  IsAnonymous,
  LikeCount,
  Message,
  Tier,
  TierValue
} from '@domain/hyper-chat'
import { HyperChatAdminRepository } from '@domain/hyper-chat-admin'
import {
  ModerationStatus,
  ModerationStatusValue
} from '@domain/hyper-chat-moderation'
import { Amount } from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatAdminRepositoryImpl implements HyperChatAdminRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findAll: HyperChatAdminRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.hyperChat.findMany({
      where: {
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
      include: {
        user: { include: { userProfile: true } },
        moderation: true
      },
      orderBy,
      take: limit,
      skip: offset
    })

    return new HyperChats(rows.map(row => this.toDomain(row)))
  }

  count: HyperChatAdminRepository['count'] = async ({ where }) => {
    return await this.prismaInfraService.hyperChat.count({
      where: {
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
    user: {
      name: string | null
      image: string | null
      userProfile: { username: string } | null
    }
    moderation: { status: string } | null
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
      moderationStatus: row.moderation
        ? new ModerationStatus(row.moderation.status as ModerationStatusValue)
        : undefined,
      author: {
        name: row.user.name,
        image: row.user.image,
        username: row.user.userProfile?.username ?? null
      }
    })
  }
}
