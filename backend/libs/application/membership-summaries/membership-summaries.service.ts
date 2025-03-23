import { Inject, Injectable } from '@nestjs/common'
import { MembershipSummaryRepository } from '@domain/membership-summary'

@Injectable()
export class MembershipSummariesService {
  constructor(
    @Inject('MembershipSummaryRepository')
    private readonly membershipSummaryRepository: MembershipSummaryRepository
  ) {}

  async findAll(args: Parameters<MembershipSummaryRepository['findAll']>[0]) {
    return await this.membershipSummaryRepository.findAll(args)
  }

  async count(args: Parameters<MembershipSummaryRepository['count']>[0]) {
    return await this.membershipSummaryRepository.count(args)
  }

  async findOne(args: Parameters<MembershipSummaryRepository['findOne']>[0]) {
    return await this.membershipSummaryRepository.findOne(args)
  }

  async findHistories(
    args: Parameters<MembershipSummaryRepository['findHistories']>[0]
  ) {
    return await this.membershipSummaryRepository.findHistories(args)
  }

  async create(args: Parameters<MembershipSummaryRepository['create']>[0]) {
    await this.membershipSummaryRepository.create(args)
  }
}
