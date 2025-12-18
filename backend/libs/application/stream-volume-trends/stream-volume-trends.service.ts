import { Inject, Injectable } from '@nestjs/common'
import {
  StreamVolumeTrendRepository,
  StreamVolumeTrends
} from '@domain/stream-volume-trend'

@Injectable()
export class StreamVolumeTrendsService {
  constructor(
    @Inject('StreamVolumeTrendRepository')
    private readonly streamVolumeTrendRepository: StreamVolumeTrendRepository
  ) {}

  async findAll(
    args: Parameters<StreamVolumeTrendRepository['findAll']>[0]
  ): Promise<StreamVolumeTrends> {
    return await this.streamVolumeTrendRepository.findAll(args)
  }
}
