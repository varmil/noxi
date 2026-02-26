import { Inject, Injectable } from '@nestjs/common'
import { HyperChatAdminRepository } from '@domain/hyper-chat-admin'

@Injectable()
export class HyperChatAdminService {
  constructor(
    @Inject('HyperChatAdminRepository')
    private readonly repository: HyperChatAdminRepository
  ) {}

  async findAll(
    args: Parameters<HyperChatAdminRepository['findAll']>[0]
  ) {
    return await this.repository.findAll(args)
  }

  async count(
    args: Parameters<HyperChatAdminRepository['count']>[0]
  ) {
    return await this.repository.count(args)
  }
}
