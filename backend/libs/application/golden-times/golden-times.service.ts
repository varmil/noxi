import { Inject, Injectable } from '@nestjs/common'
import { GoldenTimeRepository, GoldenTimes } from '@domain/golden-time'

@Injectable()
export class GoldenTimesService {
  constructor(
    @Inject('GoldenTimeRepository')
    private readonly goldenTimeRepository: GoldenTimeRepository
  ) {}

  async findAll(
    args: Parameters<GoldenTimeRepository['findAll']>[0]
  ): Promise<GoldenTimes> {
    return await this.goldenTimeRepository.findAll(args)
  }
}
