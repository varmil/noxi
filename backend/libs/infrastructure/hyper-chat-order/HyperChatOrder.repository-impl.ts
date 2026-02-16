import { Injectable, Logger } from '@nestjs/common'
import { GroupId } from '@domain/group'
import { IsAnonymous, Message, Status, Tier, TierValue } from '@domain/hyper-chat'
import {
  Amount,
  HyperChatOrder,
  HyperChatOrderId,
  HyperChatOrderRepository,
  StripePaymentIntentId
} from '@domain/hyper-chat-order'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatOrderRepositoryImpl implements HyperChatOrderRepository {
  private readonly logger = new Logger(HyperChatOrderRepositoryImpl.name)

  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  create: HyperChatOrderRepository['create'] = async ({ data }) => {
    const row = await this.prismaInfraService.hyperChatOrder.create({
      data: {
        stripePaymentIntentId: data.stripePaymentIntentId.get(),
        userId: data.userId.get(),
        channelId: data.channelId.get(),
        group: data.group.get(),
        gender: data.gender.get(),
        tier: data.tier.get(),
        amount: data.amount.get(),
        message: data.message.get(),
        isAnonymous: data.isAnonymous?.get() ?? false,
        status: 'pending'
      }
    })

    return this.toDomain(row)
  }

  updateStatus: HyperChatOrderRepository['updateStatus'] = async ({
    id,
    status
  }) => {
    await this.prismaInfraService.hyperChatOrder.update({
      where: { id: id.get() },
      data: { status: status.get() }
    })
  }

  completeByPaymentIntentId: HyperChatOrderRepository['completeByPaymentIntentId'] =
    async ({ stripePaymentIntentId }) => {
      const existing = await this.prismaInfraService.hyperChatOrder.findUnique({
        where: { stripePaymentIntentId: stripePaymentIntentId.get() }
      })

      if (!existing) {
        this.logger.warn(
          `Order not found for PaymentIntent: ${stripePaymentIntentId.get()}`
        )
        return null
      }

      // 冪等性: すでに completed なら何もしない
      if (existing.status === 'completed') {
        this.logger.log(
          `Order already completed: ${stripePaymentIntentId.get()}`
        )
        return null
      }

      const row = await this.prismaInfraService.hyperChatOrder.update({
        where: { stripePaymentIntentId: stripePaymentIntentId.get() },
        data: { status: 'completed' }
      })

      return this.toDomain(row)
    }

  failByPaymentIntentId: HyperChatOrderRepository['failByPaymentIntentId'] =
    async ({ stripePaymentIntentId }) => {
      const existing = await this.prismaInfraService.hyperChatOrder.findUnique({
        where: { stripePaymentIntentId: stripePaymentIntentId.get() }
      })

      if (!existing) {
        this.logger.warn(
          `Order not found for PaymentIntent: ${stripePaymentIntentId.get()}`
        )
        return
      }

      // 冪等性: すでに completed なら failed に戻さない
      if (existing.status === 'completed') {
        this.logger.log(
          `Order already completed, skipping fail: ${stripePaymentIntentId.get()}`
        )
        return
      }

      await this.prismaInfraService.hyperChatOrder.update({
        where: { stripePaymentIntentId: stripePaymentIntentId.get() },
        data: { status: 'failed' }
      })
    }

  findById: HyperChatOrderRepository['findById'] = async id => {
    const row = await this.prismaInfraService.hyperChatOrder.findUnique({
      where: { id: id.get() }
    })

    return row ? this.toDomain(row) : null
  }

  findByPaymentIntentId: HyperChatOrderRepository['findByPaymentIntentId'] =
    async stripePaymentIntentId => {
      const row = await this.prismaInfraService.hyperChatOrder.findUnique({
        where: { stripePaymentIntentId: stripePaymentIntentId.get() }
      })

      return row ? this.toDomain(row) : null
    }

  private toDomain(row: {
    id: number
    stripePaymentIntentId: string
    userId: number
    channelId: string
    group: string
    gender: string
    tier: string
    amount: number
    message: string
    isAnonymous: boolean
    status: string
    createdAt: Date
    updatedAt: Date
  }): HyperChatOrder {
    return new HyperChatOrder({
      id: new HyperChatOrderId(row.id),
      stripePaymentIntentId: new StripePaymentIntentId(
        row.stripePaymentIntentId
      ),
      userId: new UserId(row.userId),
      channelId: new ChannelId(row.channelId),
      group: new GroupId(row.group),
      gender: new Gender(row.gender),
      tier: new Tier(row.tier as TierValue),
      amount: new Amount(row.amount),
      message: new Message(row.message),
      status: new Status(row.status as 'pending' | 'completed' | 'failed'),
      isAnonymous: new IsAnonymous(row.isAnonymous),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    })
  }
}
