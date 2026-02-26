import { Inject, Injectable } from '@nestjs/common'
import { HyperChatModerationRepository } from '@domain/hyper-chat-moderation'

@Injectable()
export class HyperChatModerationsService {
  constructor(
    @Inject('HyperChatModerationRepository')
    private readonly repository: HyperChatModerationRepository
  ) {}

  async upsert(
    args: Parameters<HyperChatModerationRepository['upsert']>[0]
  ) {
    return await this.repository.upsert(args)
  }

  async delete(
    args: Parameters<HyperChatModerationRepository['delete']>[0]
  ) {
    return await this.repository.delete(args)
  }

  async findOne(
    args: Parameters<HyperChatModerationRepository['findOne']>[0]
  ) {
    return await this.repository.findOne(args)
  }
}
