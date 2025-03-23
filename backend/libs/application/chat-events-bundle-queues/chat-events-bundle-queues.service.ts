import { Inject, Injectable } from '@nestjs/common'
import { ChatEventsBundleQueueRepository } from '@domain/chat-events-bundle-queue'
import { StreamRepository } from '@domain/stream'

@Injectable()
export class ChatEventsBundleQueuesService {
  constructor(
    @Inject('ChatEventsBundleQueueRepository')
    private readonly chatEventsBundleQueueRepository: ChatEventsBundleQueueRepository,
    @Inject('StreamRepository')
    private readonly streamRepository: StreamRepository
  ) {}

  async findAll(
    args: Parameters<ChatEventsBundleQueueRepository['findAll']>[0]
  ) {
    return await this.chatEventsBundleQueueRepository.findAll(args)
  }

  async save(args: Parameters<ChatEventsBundleQueueRepository['save']>[0]) {
    // 数年前のStreamが削除/更新された際もこの関数が呼ばれうるが
    // StreamがそもそもDBになければバンドルできないので
    // 保存しようとしている時点でStreamの存在をチェック
    if (
      !(await this.streamRepository.findOne({
        where: { videoId: args.where.videoId }
      }))
    ) {
      return
    }

    await this.chatEventsBundleQueueRepository.save(args)
  }

  async delete(args: Parameters<ChatEventsBundleQueueRepository['delete']>[0]) {
    await this.chatEventsBundleQueueRepository.delete(args)
  }
}
