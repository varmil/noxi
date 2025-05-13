import { Inject, Injectable } from '@nestjs/common'
import { CheerTicketRepository } from '@domain/cheer-ticket'

@Injectable()
export class CheerTicketsService {
  constructor(
    @Inject('CheerTicketRepository')
    private readonly cheerTicketRepository: CheerTicketRepository
  ) {}

  async findAll(args: Parameters<CheerTicketRepository['findAll']>[0]) {
    return await this.cheerTicketRepository.findAll(args)
  }

  async findByUserId(
    args: Parameters<CheerTicketRepository['findByUserId']>[0]
  ) {
    return await this.cheerTicketRepository.findByUserId(args)
  }
}
