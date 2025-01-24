import { Inject, Injectable } from '@nestjs/common'
import { ChatBundleQueueRepository } from '@domain/chat-bundle-queue'
import { StreamRepository } from '@domain/stream'

@Injectable()
export class ChatBundleQueuesService {
  constructor(
    @Inject('ChatBundleQueueRepository')
    private readonly chatBundleQueueRepository: ChatBundleQueueRepository,
    @Inject('StreamRepository')
    private readonly streamRepository: StreamRepository
  ) {}

  async findAll(args: Parameters<ChatBundleQueueRepository['findAll']>[0]) {
    return await this.chatBundleQueueRepository.findAll(args)
  }

  async save(args: Parameters<ChatBundleQueueRepository['save']>[0]) {
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

    await this.chatBundleQueueRepository.save(args)
  }

  async delete(args: Parameters<ChatBundleQueueRepository['delete']>[0]) {
    await this.chatBundleQueueRepository.delete(args)
  }
}
