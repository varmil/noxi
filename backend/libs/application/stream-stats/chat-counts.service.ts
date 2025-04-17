import { Inject, Injectable } from '@nestjs/common'
import { ChatCount, ChatCountRepository } from '@domain/stream-stats'

@Injectable()
export class ChatCountsService {
  constructor(
    @Inject('ChatCountRepository')
    private readonly chatCountRepository: ChatCountRepository
  ) {}

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

  async delete(
    args: Parameters<ChatCountRepository['delete']>[0]
  ): Promise<void> {
    await this.chatCountRepository.delete(args)
  }
}
