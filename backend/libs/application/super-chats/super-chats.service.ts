import { Inject, Injectable } from '@nestjs/common'
import { SuperChatRepository } from '@domain/supers'

@Injectable()
export class SuperChatsService {
  constructor(
    @Inject('SuperChatRepository')
    private readonly superChatRepository: SuperChatRepository
  ) {}

  async save(args: Parameters<SuperChatRepository['save']>[0]): Promise<void> {
    await this.superChatRepository.save(args)
  }
}
