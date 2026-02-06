import { Injectable, Logger } from '@nestjs/common'
import { HyperChatTicketsService } from '@app/hyper-chat-tickets/hyper-chat-tickets.service'
import { GroupId } from '@domain/group'
import { HyperChat } from '@domain/hyper-chat'
import { HyperChatTicketId } from '@domain/hyper-chat-ticket'
import { Gender } from '@domain/lib'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperChatTicketsScenario {
  private readonly logger = new Logger(HyperChatTicketsScenario.name)

  constructor(
    private readonly hyperChatTicketsService: HyperChatTicketsService
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
    message: string
  }): Promise<HyperChat> {
    const hyperChat = await this.hyperChatTicketsService.useTicket(args)

    this.logger.log(
      `Created HyperChat ${hyperChat.id.get()} from Ticket ${args.ticketId.get()}`
    )

    return hyperChat
  }
}
