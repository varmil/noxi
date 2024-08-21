import { Inject, Injectable } from '@nestjs/common'
import { VideoRepository } from '@domain/youtube/video/Video.repository'

@Injectable()
export class VideosService {
  constructor(
    @Inject('VideoRepository')
    private readonly videoRepository: VideoRepository
  ) {}

  async findByChannel(args: Parameters<VideoRepository['findByChannel']>[0]) {
    return await this.videoRepository.findByChannel(args)
  }

  async findById(args: Parameters<VideoRepository['findById']>[0]) {
    return await this.videoRepository.findById(args)
  }

  async findAll(args: Parameters<VideoRepository['findAll']>[0]) {
    return await this.videoRepository.findAll(args)
  }
}
