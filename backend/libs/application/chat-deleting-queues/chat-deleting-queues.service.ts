import { Inject, Injectable } from '@nestjs/common'
import { ChatDeletingQueueRepository } from '@domain/chat-deleting-queue'
import { StreamRepository } from '@domain/stream'

@Injectable()
export class ChatDeletingQueuesService {
  constructor(
    @Inject('ChatDeletingQueueRepository')
    private readonly chatDeletingQueueRepository: ChatDeletingQueueRepository,
    @Inject('StreamRepository')
    private readonly streamRepository: StreamRepository
  ) {}

  async findAll(args: Parameters<ChatDeletingQueueRepository['findAll']>[0]) {
    return await this.chatDeletingQueueRepository.findAll(args)
  }

  async save(args: Parameters<ChatDeletingQueueRepository['save']>[0]) {
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

    await this.chatDeletingQueueRepository.save(args)
  }

  async delete(args: Parameters<ChatDeletingQueueRepository['delete']>[0]) {
    await this.chatDeletingQueueRepository.delete(args)
  }
}
