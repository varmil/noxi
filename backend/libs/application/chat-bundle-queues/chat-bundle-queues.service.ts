import { Inject, Injectable } from '@nestjs/common'
import { ChatBundleQueueRepository } from '@domain/chat-bundle-queue'

@Injectable()
export class ChatBundleQueuesService {
  constructor(
    @Inject('ChatBundleQueueRepository')
    private readonly streamRepository: ChatBundleQueueRepository
  ) {}

  async findAll(args: Parameters<ChatBundleQueueRepository['findAll']>[0]) {
    return await this.streamRepository.findAll(args)
  }

  async save(args: Parameters<ChatBundleQueueRepository['save']>[0]) {
    await this.streamRepository.save(args)
  }

  async delete(args: Parameters<ChatBundleQueueRepository['delete']>[0]) {
    await this.streamRepository.delete(args)
  }
}
