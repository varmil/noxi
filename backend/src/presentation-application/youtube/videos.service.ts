import { Inject, Injectable } from '@nestjs/common'
import { VideoRepository } from '@domain/youtube/video/Video.repository'
import { Videos } from '@domain/youtube/video/Videos.collection'

@Injectable()
export class VideosService {
  constructor(
    @Inject('VideoRepository')
    private readonly videoRepository: VideoRepository
  ) {}

  async findAll(
    args: Parameters<VideoRepository['findAll']>[0]
  ): Promise<Videos> {
    return await this.videoRepository.findAll(args)
  }

  async save(video: Parameters<VideoRepository['save']>[0]): Promise<void> {
    await this.videoRepository.save(video)
  }
}
