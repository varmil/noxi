import { Inject, Injectable } from '@nestjs/common'
import { ExchangeRateRepository } from '@domain/exchange-rate'
import { SuperChatRepository, SuperChats } from '@domain/supers'
import { VideoId } from '@domain/youtube'

@Injectable()
export class SuperChatsService {
  constructor(
    @Inject('ExchangeRateRepository')
    private readonly exchangeRateRepository: ExchangeRateRepository,
    @Inject('SuperChatRepository')
    private readonly superChatRepository: SuperChatRepository
  ) {}

  async findAll(
    args: Parameters<SuperChatRepository['findAll']>[0]
  ): Promise<SuperChats> {
    return await this.superChatRepository.findAll(args)
  }

  async save(args: Parameters<SuperChatRepository['save']>[0]): Promise<void> {
    await this.superChatRepository.save(args)
  }

  async calculateTotalInJPY({
    where: { videoId }
  }: {
    where: { videoId: VideoId }
  }) {
    const chats = await this.superChatRepository.findAll({
      where: { videoId }
    })
    const rates = await this.exchangeRateRepository.findAll()
    return {
      amountMicros: chats.calculateTotalInJPY(rates),
      count: chats.length
    }
  }
}
