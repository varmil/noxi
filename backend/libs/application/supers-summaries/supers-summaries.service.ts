import { Inject, Injectable } from '@nestjs/common'
import { SupersSummaryRepository } from '@domain/supers-summary'

@Injectable()
export class SupersSummariesService {
  constructor(
    @Inject('SupersSummaryRepository')
    private readonly supersSummaryRepository: SupersSummaryRepository
  ) {}

  async findAll(args: Parameters<SupersSummaryRepository['findAll']>[0]) {
    return await this.supersSummaryRepository.findAll(args)
  }

  async findOne(args: Parameters<SupersSummaryRepository['findOne']>[0]) {
    return await this.supersSummaryRepository.findOne(args)
  }

  async create(args: Parameters<SupersSummaryRepository['create']>[0]) {
    await this.supersSummaryRepository.create(args)
  }
}