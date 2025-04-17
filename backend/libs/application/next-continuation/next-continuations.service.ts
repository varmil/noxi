import { Inject, Injectable } from '@nestjs/common'
import { NextContinuation, NextContinuationRepository } from '@domain/next-continuation'

@Injectable()
export class NextContinuationsService {
  constructor(
    @Inject('NextContinuationRepository')
    private readonly nextContinuationRepository: NextContinuationRepository
  ) {}

  async findLatest(
    args: Parameters<NextContinuationRepository['findOne']>[0]
  ): Promise<NextContinuation | null> {
    return await this.nextContinuationRepository.findOne({
      where: args.where,
      orderBy: [{ createdAt: 'desc' }]
    })
  }

  async save(args: Parameters<NextContinuationRepository['save']>[0]): Promise<void> {
    await this.nextContinuationRepository.save(args)
  }

  async delete(
    args: Parameters<NextContinuationRepository['delete']>[0]
  ): Promise<void> {
    await this.nextContinuationRepository.delete(args)
  }
}
