import { Inject, Injectable } from '@nestjs/common'
import {
  ConcurrentViewerTrendRepository,
  ConcurrentViewerTrends
} from '@domain/concurrent-viewer-trend'

@Injectable()
export class ConcurrentViewerTrendsService {
  constructor(
    @Inject('ConcurrentViewerTrendRepository')
    private readonly concurrentViewerTrendRepository: ConcurrentViewerTrendRepository
  ) {}

  async findAll(
    args: Parameters<ConcurrentViewerTrendRepository['findAll']>[0]
  ): Promise<ConcurrentViewerTrends> {
    return await this.concurrentViewerTrendRepository.findAll(args)
  }
}
