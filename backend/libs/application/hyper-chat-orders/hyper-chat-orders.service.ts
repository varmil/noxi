import { Inject, Injectable } from '@nestjs/common'
import { HyperChatOrderRepository } from '@domain/hyper-chat-order'

@Injectable()
export class HyperChatOrdersService {
  constructor(
    @Inject('HyperChatOrderRepository')
    private readonly hyperChatOrderRepository: HyperChatOrderRepository
  ) {}

  async create(args: Parameters<HyperChatOrderRepository['create']>[0]) {
    return await this.hyperChatOrderRepository.create(args)
  }

  async updateStatus(
    args: Parameters<HyperChatOrderRepository['updateStatus']>[0]
  ) {
    return await this.hyperChatOrderRepository.updateStatus(args)
  }

  async completeByPaymentIntentId(
    args: Parameters<HyperChatOrderRepository['completeByPaymentIntentId']>[0]
  ) {
    return await this.hyperChatOrderRepository.completeByPaymentIntentId(args)
  }

  async failByPaymentIntentId(
    args: Parameters<HyperChatOrderRepository['failByPaymentIntentId']>[0]
  ) {
    return await this.hyperChatOrderRepository.failByPaymentIntentId(args)
  }

  async findById(args: Parameters<HyperChatOrderRepository['findById']>[0]) {
    return await this.hyperChatOrderRepository.findById(args)
  }

  async findByPaymentIntentId(
    args: Parameters<HyperChatOrderRepository['findByPaymentIntentId']>[0]
  ) {
    return await this.hyperChatOrderRepository.findByPaymentIntentId(args)
  }
}
