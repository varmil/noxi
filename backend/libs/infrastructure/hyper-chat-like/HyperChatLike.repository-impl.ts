import { Injectable } from '@nestjs/common'
import { HyperChatId } from '@domain/hyper-chat'
import { HyperChatLikeRepository } from '@domain/hyper-chat-like'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatLikeRepositoryImpl implements HyperChatLikeRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  create: HyperChatLikeRepository['create'] = async ({
    hyperChatId,
    userId
  }) => {
    await this.prismaInfraService.$transaction(async tx => {
      // いいね作成（既に存在する場合は何もしない）
      const existing = await tx.hyperChatLike.findUnique({
        where: {
          hyperChatId_userId: {
            hyperChatId: hyperChatId.get(),
            userId: userId.get()
          }
        }
      })

      if (!existing) {
        await tx.hyperChatLike.create({
          data: {
            hyperChatId: hyperChatId.get(),
            userId: userId.get()
          }
        })

        // likeCount をインクリメント
        await tx.hyperChat.update({
          where: { id: hyperChatId.get() },
          data: { likeCount: { increment: 1 } }
        })
      }
    })
  }

  delete: HyperChatLikeRepository['delete'] = async ({
    hyperChatId,
    userId
  }) => {
    await this.prismaInfraService.$transaction(async tx => {
      // いいねが存在するか確認
      const existing = await tx.hyperChatLike.findUnique({
        where: {
          hyperChatId_userId: {
            hyperChatId: hyperChatId.get(),
            userId: userId.get()
          }
        }
      })

      if (existing) {
        await tx.hyperChatLike.delete({
          where: {
            hyperChatId_userId: {
              hyperChatId: hyperChatId.get(),
              userId: userId.get()
            }
          }
        })

        // likeCount をデクリメント
        await tx.hyperChat.update({
          where: { id: hyperChatId.get() },
          data: { likeCount: { decrement: 1 } }
        })
      }
    })
  }

  findLikedHyperChatIds: HyperChatLikeRepository['findLikedHyperChatIds'] =
    async ({ hyperChatIds, userId }) => {
      if (hyperChatIds.length === 0) {
        return new Set<HyperChatId>()
      }

      const likes = await this.prismaInfraService.hyperChatLike.findMany({
        where: {
          hyperChatId: { in: hyperChatIds.map(id => id.get()) },
          userId: userId.get()
        },
        select: { hyperChatId: true }
      })

      return new Set(likes.map(like => new HyperChatId(like.hyperChatId)))
    }
}
