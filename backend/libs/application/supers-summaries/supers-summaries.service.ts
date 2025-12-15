import { Inject, Injectable } from '@nestjs/common'
import { SupersSummaryRepository, SupersMonthlySummaryRepository  } from '@domain/supers-summary'

@Injectable()
export class SupersSummariesService {
  constructor(
    @Inject('SupersMonthlySummaryRepository')
    private readonly supersMonthlySummaryRepository: SupersMonthlySummaryRepository,
    @Inject('SupersSummaryRepository')
    private readonly supersSummaryRepository: SupersSummaryRepository
  ) {}

  async findAll(args: Parameters<SupersSummaryRepository['findAll']>[0]) {
    return await this.supersSummaryRepository.findAll(args)
  }

  async count(args: Parameters<SupersSummaryRepository['count']>[0]) {
    return await this.supersSummaryRepository.count(args)
  }

  async findOne(args: Parameters<SupersSummaryRepository['findOne']>[0]) {
    return await this.supersSummaryRepository.findOne(args)
  }

  async findHistories(
    args: Parameters<SupersSummaryRepository['findHistories']>[0]
  ) {
    return await this.supersSummaryRepository.findHistories(args)
  }

  async create(args: Parameters<SupersSummaryRepository['create']>[0]) {
    await this.supersSummaryRepository.create(args)
  }

  async findAllMonthly(
    args: Parameters<SupersMonthlySummaryRepository['findAll']>[0]
  ) {
    return await this.supersMonthlySummaryRepository.findAll(args)
  }
}
