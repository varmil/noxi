import { Inject, Injectable } from '@nestjs/common'
import { HyperChatTicketRepository } from '@domain/hyper-chat-ticket'

@Injectable()
export class HyperChatTicketsService {
  constructor(
    @Inject('HyperChatTicketRepository')
    private readonly hyperChatTicketRepository: HyperChatTicketRepository
  ) {}

  async findValidByUserId(
    args: Parameters<HyperChatTicketRepository['findValidByUserId']>[0]
  ) {
    return await this.hyperChatTicketRepository.findValidByUserId(args)
  }

  async useTicket(
    args: Parameters<HyperChatTicketRepository['useTicket']>[0]
  ) {
    return await this.hyperChatTicketRepository.useTicket(args)
  }
}
