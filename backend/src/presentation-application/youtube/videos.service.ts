import { Inject, Injectable } from '@nestjs/common'
import { Video } from '@domain/youtube/video/Video.entity'
import { VideoRepository } from '@domain/youtube/video/Video.repository'
import { Videos } from '@domain/youtube/video/Videos.collection'

@Injectable()
export class VideosService {
  constructor(
    @Inject('VideoRepository')
    private readonly videoRepository: VideoRepository
  ) {}

  async save(video: Video): Promise<void> {
    await this.videoRepository.save(video)
    return
  }

  async findAll(args: { limit?: number }): Promise<Videos> {
    try {
      const videos = await this.videoRepository.findAll(args)
      return videos
    } catch (error) {
      console.error('Error fetching data from DB', error)
      return new Videos([])
    }
  }
}
