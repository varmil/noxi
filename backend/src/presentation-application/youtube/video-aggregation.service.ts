import { Inject, Injectable } from '@nestjs/common'
import { VideoAggregations } from '@domain/youtube'
import { VideoAggregationRepository } from '@domain/youtube/video-aggregation/VideoAggregation.repository'

@Injectable()
export class VideoAggregationsService {
  constructor(
    @Inject('VideoAggregationRepository')
    private readonly videoAggregationRepository: VideoAggregationRepository
  ) {}

  async findAllByChannelId(
    id: Parameters<VideoAggregationRepository['findAllByChannelId']>[0],
    args: Parameters<VideoAggregationRepository['findAllByChannelId']>[1]
  ): Promise<VideoAggregations | null> {
    return await this.videoAggregationRepository.findAllByChannelId(id, args)
  }

  async save(
    videoAggregation: Parameters<VideoAggregationRepository['save']>[0]
  ): Promise<void> {
    await this.videoAggregationRepository.save(videoAggregation)
  }
}
