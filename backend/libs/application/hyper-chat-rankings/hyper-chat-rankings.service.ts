import { Inject, Injectable } from '@nestjs/common'
import { HyperChatRankingRepository } from '@domain/hyper-chat-ranking'

@Injectable()
export class HyperChatRankingsService {
  constructor(
    @Inject('HyperChatRankingRepository')
    private readonly repository: HyperChatRankingRepository
  ) {}

  findPosterRanking: HyperChatRankingRepository['findPosterRanking'] =
    async args => {
      return await this.repository.findPosterRanking(args)
    }

  countPosterRanking: HyperChatRankingRepository['countPosterRanking'] =
    async args => {
      return await this.repository.countPosterRanking(args)
    }

  findAnonymousPoster: HyperChatRankingRepository['findAnonymousPoster'] =
    async args => {
      return await this.repository.findAnonymousPoster(args)
    }
}
