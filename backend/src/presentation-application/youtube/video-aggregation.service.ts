import { Inject, Injectable } from '@nestjs/common'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { VideoAggregationRepository } from '@domain/youtube/video-aggregation/VideoAggregation.repository'

@Injectable()
export class VideoAggregationsService {
  constructor(
    @Inject('VideoAggregationRepository')
    private readonly videoAggregationRepository: VideoAggregationRepository
  ) {}

  async findOne(
    args: Parameters<VideoAggregationRepository['findOne']>[0]
  ): Promise<VideoAggregation | null> {
    return await this.videoAggregationRepository.findOne(args)
  }

  async save(
    videoAggregation: Parameters<VideoAggregationRepository['save']>[0]
  ): Promise<void> {
    await this.videoAggregationRepository.save(videoAggregation)
  }

  // async findAll(
  //   args: Parameters<VideoAggregationRepository['findAll']>[0]
  // ): Promise<VideoAggregations> {
  //   try {
  //     const videoAggregations =
  //       await this.videoAggregationRepository.findAll(args)
  //     return videoAggregations
  //   } catch (error) {
  //     console.error('Error fetching data from DB', error)
  //     return new VideoAggregations([])
  //   }
  // }
}
