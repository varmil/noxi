import { Inject, Injectable } from '@nestjs/common'
import { CheerTicketUsageRepository } from '@domain/cheer-ticket-usage'
import { CheerRankingRepository } from '@domain/cheer-ticket-usage/CheerRanking.repository'

@Injectable()
export class CheerTicketUsagesService {
  constructor(
    @Inject('CheerRankingRepository')
    private readonly cheerRankingRepository: CheerRankingRepository,
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
    args: Parameters<CheerRankingRepository['findCheeredRanking']>[0]
  ) {
    return this.cheerRankingRepository.findCheeredRanking(args)
  }

  async findFanRanking(
    args: Parameters<CheerRankingRepository['findFanRanking']>[0]
  ) {
    return this.cheerRankingRepository.findFanRanking(args)
  }

  async countCheeredRanking(
    args: Parameters<CheerRankingRepository['countCheeredRanking']>[0]
  ) {
    return this.cheerRankingRepository.countCheeredRanking(args)
  }

  async countFanRanking(
    args: Parameters<CheerRankingRepository['countFanRanking']>[0]
  ) {
    return this.cheerRankingRepository.countFanRanking(args)
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
