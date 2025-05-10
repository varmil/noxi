import { Inject, Injectable } from '@nestjs/common'
import { CheerTicketUsageRepository } from '@domain/cheer-ticket-usage'

@Injectable()
export class CheerTicketUsagesService {
  constructor(
    @Inject('CheerTicketUsageRepository')
    private readonly cheerTicketUsageRepository: CheerTicketUsageRepository
  ) {}

  async consume(args: Parameters<CheerTicketUsageRepository['consume']>[0]) {
    return this.cheerTicketUsageRepository.consume(args)
  }

  async findAll(args: Parameters<CheerTicketUsageRepository['findAll']>[0]) {
    return this.cheerTicketUsageRepository.findAll(args)
  }

  async findCheeredRanking(
    args: Parameters<CheerTicketUsageRepository['findCheeredRanking']>[0]
  ) {
    return this.cheerTicketUsageRepository.findCheeredRanking(args)
  }

  async findFanRanking(
    args: Parameters<CheerTicketUsageRepository['findFanRanking']>[0]
  ) {
    return this.cheerTicketUsageRepository.findFanRanking(args)
  }

  async findCheeredRank(
    args: Parameters<CheerTicketUsageRepository['findCheeredRank']>[0]
  ) {
    return this.cheerTicketUsageRepository.findCheeredRank(args)
  }

  async findFanRank(
    args: Parameters<CheerTicketUsageRepository['findFanRank']>[0]
  ) {
    return this.cheerTicketUsageRepository.findFanRank(args)
  }
}
