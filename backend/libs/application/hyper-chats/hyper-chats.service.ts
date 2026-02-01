import { Inject, Injectable } from '@nestjs/common'
import { HyperChatRepository } from '@domain/hyper-chat'

@Injectable()
export class HyperChatsService {
  constructor(
    @Inject('HyperChatRepository')
    private readonly hyperChatRepository: HyperChatRepository
  ) {}

  async create(args: Parameters<HyperChatRepository['create']>[0]) {
    return await this.hyperChatRepository.create(args)
  }

  async findById(args: Parameters<HyperChatRepository['findById']>[0]) {
    return await this.hyperChatRepository.findById(args)
  }

  async findByOrderId(
    args: Parameters<HyperChatRepository['findByOrderId']>[0]
  ) {
    return await this.hyperChatRepository.findByOrderId(args)
  }

  async findAll(args: Parameters<HyperChatRepository['findAll']>[0]) {
    return await this.hyperChatRepository.findAll(args)
  }

  async count(args: Parameters<HyperChatRepository['count']>[0]) {
    return await this.hyperChatRepository.count(args)
  }

  async sumAmount(args: Parameters<HyperChatRepository['sumAmount']>[0]) {
    return await this.hyperChatRepository.sumAmount(args)
  }

  async countDistinctUsers(
    args: Parameters<HyperChatRepository['countDistinctUsers']>[0]
  ) {
    return await this.hyperChatRepository.countDistinctUsers(args)
  }
}
