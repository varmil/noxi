import { Inject, Injectable } from '@nestjs/common'
import { HyperChatTicketProgressRepository } from '@domain/hyper-chat-ticket-progress'

@Injectable()
export class HyperChatTicketProgressService {
  constructor(
    @Inject('HyperChatTicketProgressRepository')
    private readonly hyperChatTicketProgressRepository: HyperChatTicketProgressRepository
  ) {}

  async recordLoginAndGrantIfEligible(
    args: Parameters<
      HyperChatTicketProgressRepository['recordLoginAndGrantIfEligible']
    >[0]
  ) {
    return await this.hyperChatTicketProgressRepository.recordLoginAndGrantIfEligible(
      args
    )
  }
}
