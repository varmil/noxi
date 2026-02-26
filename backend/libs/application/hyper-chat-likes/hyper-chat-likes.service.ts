import { Inject, Injectable } from '@nestjs/common'
import { HyperChatLikeRepository } from '@domain/hyper-chat-like'

@Injectable()
export class HyperChatLikesService {
  constructor(
    @Inject('HyperChatLikeRepository')
    private readonly hyperChatLikeRepository: HyperChatLikeRepository
  ) {}

  async create(args: Parameters<HyperChatLikeRepository['create']>[0]) {
    return await this.hyperChatLikeRepository.create(args)
  }

  async delete(args: Parameters<HyperChatLikeRepository['delete']>[0]) {
    return await this.hyperChatLikeRepository.delete(args)
  }

  async findLikedHyperChatIds(
    args: Parameters<HyperChatLikeRepository['findLikedHyperChatIds']>[0]
  ) {
    return await this.hyperChatLikeRepository.findLikedHyperChatIds(args)
  }
}
