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

  async findAllChatCounts(
    args: Parameters<ChatCountRepository['findAllChatCounts']>[0]
  ): Promise<ChatCounts> {
    return await this.chatCountRepository.findAllChatCounts(args)
  }

  async findLatestChatCount(
    args: Parameters<ChatCountRepository['findLatestChatCount']>[0]
  ): Promise<ChatCount | null> {
    return await this.chatCountRepository.findLatestChatCount(args)
  }

  async saveChatCount(
    args: Parameters<ChatCountRepository['saveChatCount']>[0]
  ): Promise<void> {
    await this.chatCountRepository.saveChatCount(args)
  }

  async bundleChatCounts(args: { where: { videoId: VideoId } }): Promise<void> {
    const chatCounts = (
      await this.chatCountRepository.findAllChatCounts({
        where: { videoId: args.where.videoId }
      })
    ).bundle()
    await this.chatCountRepository.bundleChatCounts({
      where: { videoId: args.where.videoId },
      data: chatCounts
    })
  }
}
