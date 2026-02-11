import { Injectable, Logger } from '@nestjs/common'
import { HyperChatTicketsService } from '@app/hyper-chat-tickets/hyper-chat-tickets.service'
import { HyperTrainEvaluatorService } from '@app/hyper-trains/hyper-train-evaluator.service'
import { GroupId } from '@domain/group'
import { HyperChat, Message } from '@domain/hyper-chat'
import { HyperChatTicketId } from '@domain/hyper-chat-ticket'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperChatTicketsScenario {
  private readonly logger = new Logger(HyperChatTicketsScenario.name)

  constructor(
    private readonly hyperChatTicketsService: HyperChatTicketsService,
    private readonly hyperTrainEvaluatorService: HyperTrainEvaluatorService
  ) {}

  /**
   * チケットを使用してHyperChatを作成
   */
  async useTicket(args: {
    ticketId: HyperChatTicketId
    userId: UserId
    channelId: ChannelId
    group: GroupId
    gender: Gender
    message: Message
  }): Promise<HyperChat> {
    const hyperChat = await this.hyperChatTicketsService.useTicket(args)

    this.logger.log(
      `Created HyperChat ${hyperChat.id.get()} from Ticket ${args.ticketId.get()}`
    )

    // ハイパートレイン評価（失敗してもHyperChat作成には影響させない）
    try {
      await this.hyperTrainEvaluatorService.evaluate(hyperChat)
    } catch (error) {
      this.logger.error('Failed to evaluate hyper train', error)
    }

    return hyperChat
  }
}
