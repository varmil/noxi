import { Inject, Injectable } from '@nestjs/common'
import {
  StreamStatsRepository,
  ViewerCounts,
  AvgCount
} from '@domain/stream-stats'

@Injectable()
export class StreamStatsService {
  constructor(
    @Inject('StreamStatsRepository')
    private readonly streamStatsRepository: StreamStatsRepository
  ) {}

  async findAllViewerCounts(
    args: Parameters<StreamStatsRepository['findAllViewerCounts']>[0]
  ): Promise<ViewerCounts> {
    return await this.streamStatsRepository.findAllViewerCounts(args)
  }

  async findAvgViewerCount(
    args: Parameters<StreamStatsRepository['findAvgViewerCount']>[0]
  ): Promise<AvgCount> {
    return await this.streamStatsRepository.findAvgViewerCount(args)
  }

  async saveViewerCount(
    args: Parameters<StreamStatsRepository['saveViewerCount']>[0]
  ): Promise<void> {
    await this.streamStatsRepository.saveViewerCount(args)
  }
}
