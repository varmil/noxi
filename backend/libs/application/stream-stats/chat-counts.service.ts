import { Inject, Injectable } from '@nestjs/common'
import {
  ChatCount,
  ChatCountRepository,
  ChatCounts
} from '@domain/stream-stats'
import { VideoId } from '@domain/youtube'

@Injectable()
export class ChatCountsService {
  constructor(
    @Inject('ChatCountRepository')
    private readonly chatCountRepository: ChatCountRepository
  ) {}

  async findAll(
    args: Parameters<ChatCountRepository['findAll']>[0]
  ): Promise<ChatCounts> {
    return await this.chatCountRepository.findAll(args)
  }

  async findOne(args: Parameters<ChatCountRepository['findOne']>[0]) {
    return await this.chatCountRepository.findOne(args)
  }

  async findLatest(
    args: Parameters<ChatCountRepository['findOne']>[0]
  ): Promise<ChatCount | null> {
    return await this.chatCountRepository.findOne({
      where: args.where,
      orderBy: [{ createdAt: 'desc' }]
    })
  }

  async save(args: Parameters<ChatCountRepository['save']>[0]): Promise<void> {
    await this.chatCountRepository.save(args)
  }

  async bundle(args: { where: { videoId: VideoId } }): Promise<void> {
    const chatCounts = (
      await this.chatCountRepository.findAll({
        where: { videoId: args.where.videoId }
      })
    ).bundle()
    await this.chatCountRepository.bundle({
      where: { videoId: args.where.videoId },
      data: chatCounts
    })
  }
}
