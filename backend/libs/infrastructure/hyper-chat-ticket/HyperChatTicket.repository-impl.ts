import { Injectable } from '@nestjs/common'
import { GroupId } from '@domain/group'
import {
  HyperChat,
  HyperChatId,
  LikeCount,
  Message,
  Tier,
  TierValue
} from '@domain/hyper-chat'
import { Amount } from '@domain/hyper-chat-order'
import {
  HyperChatTicket,
  HyperChatTicketId,
  HyperChatTicketRepository,
  HyperChatTickets,
  SourceType,
  SourceTypeValue
} from '@domain/hyper-chat-ticket'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatTicketRepositoryImpl implements HyperChatTicketRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findValidByUserId: HyperChatTicketRepository['findValidByUserId'] =
    async userId => {
      const now = new Date()
      const rows = await this.prismaInfraService.hyperChatTicket.findMany({
        where: {
          userId: userId.get(),
          usedAt: null,
          expiresAt: { gt: now }
        },
        orderBy: { expiresAt: 'asc' }
      })

      return new HyperChatTickets(rows.map(row => this.toDomain(row)))
    }

  useTicket: HyperChatTicketRepository['useTicket'] = async args => {
    return await this.prismaInfraService.$transaction(async tx => {
      // 1. SELECT FOR UPDATE でチケットをロック
      const tickets = await tx.$queryRawUnsafe<
        {
          id: number
          userId: number
          expiresAt: Date
          usedAt: Date | null
          sourceType: string
          createdAt: Date
        }[]
      >(
        `SELECT * FROM "HyperChatTicket" WHERE id = $1 AND "userId" = $2 FOR UPDATE`,
        args.ticketId.get(),
        args.userId.get()
      )

      const ticket = tickets[0]
      if (!ticket) {
        throw new Error('Ticket not found')
      }

      // 2. 有効性確認
      if (ticket.usedAt !== null) {
        throw new Error('Ticket already used')
      }
      if (ticket.expiresAt < new Date()) {
        throw new Error('Ticket expired')
      }

      // 3. チケット使用済みに更新
      const now = new Date()
      await tx.hyperChatTicket.update({
        where: { id: args.ticketId.get() },
        data: { usedAt: now }
      })

      // 4. HyperChat 作成（tier: 'free', amount: 0, ticketId 設定）
      const hyperChatRow = await tx.hyperChat.create({
        data: {
          ticketId: args.ticketId.get(),
          userId: args.userId.get(),
          channelId: args.channelId.get(),
          group: args.group.get(),
          gender: args.gender.get(),
          tier: 'free',
          amount: 0,
          message: args.message.get()
        },
        include: { user: true }
      })

      return new HyperChat({
        id: new HyperChatId(hyperChatRow.id),
        userId: new UserId(hyperChatRow.userId),
        channelId: new ChannelId(hyperChatRow.channelId),
        group: new GroupId(hyperChatRow.group),
        gender: new Gender(hyperChatRow.gender),
        tier: new Tier(hyperChatRow.tier as TierValue),
        amount: new Amount(hyperChatRow.amount),
        message: new Message(hyperChatRow.message),
        likeCount: new LikeCount(hyperChatRow.likeCount),
        createdAt: hyperChatRow.createdAt,
        author: {
          name: hyperChatRow.user.name,
          image: hyperChatRow.user.image,
          username: null
        }
      })
    })
  }

  private toDomain(row: {
    id: number
    userId: number
    expiresAt: Date
    usedAt: Date | null
    sourceType: string
    createdAt: Date
  }): HyperChatTicket {
    return new HyperChatTicket({
      id: new HyperChatTicketId(row.id),
      userId: new UserId(row.userId),
      expiresAt: row.expiresAt,
      usedAt: row.usedAt,
      sourceType: new SourceType(row.sourceType as SourceTypeValue),
      createdAt: row.createdAt
    })
  }
}
