import { Inject, Injectable } from '@nestjs/common'
import { SupersSnapshotRepository } from '@domain/supers-snapshot'

@Injectable()
export class SupersSnapshotsService {
  constructor(
    @Inject('SupersSnapshotRepository')
    private readonly supersSnapshotRepository: SupersSnapshotRepository
  ) {}

  async findRanking(
    args: Parameters<SupersSnapshotRepository['findRanking']>[0]
  ) {
    return await this.supersSnapshotRepository.findRanking(args)
  }
}
