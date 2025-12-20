import { Inject, Injectable } from '@nestjs/common'
import {
  DayOfWeekDistributionRepository,
  DayOfWeekDistributions
} from '@domain/day-of-week-distribution'

@Injectable()
export class DayOfWeekDistributionsService {
  constructor(
    @Inject('DayOfWeekDistributionRepository')
    private readonly dayOfWeekDistributionRepository: DayOfWeekDistributionRepository
  ) {}

  async findAll(
    args: Parameters<DayOfWeekDistributionRepository['findAll']>[0]
  ): Promise<DayOfWeekDistributions> {
    return await this.dayOfWeekDistributionRepository.findAll(args)
  }
}
