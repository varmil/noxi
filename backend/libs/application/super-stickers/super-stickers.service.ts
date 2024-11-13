import { Inject, Injectable } from '@nestjs/common'
import { ExchangeRateRepository } from '@domain/exchange-rate'
import { SuperStickerRepository, SuperStickers } from '@domain/supers'
import { VideoId } from '@domain/youtube'

@Injectable()
export class SuperStickersService {
  constructor(
    @Inject('ExchangeRateRepository')
    private readonly exchangeRateRepository: ExchangeRateRepository,
    @Inject('SuperStickerRepository')
    private readonly superStickerRepository: SuperStickerRepository
  ) {}

  async findAll(
    args: Parameters<SuperStickerRepository['findAll']>[0]
  ): Promise<SuperStickers> {
    return await this.superStickerRepository.findAll(args)
  }

  async save(
    args: Parameters<SuperStickerRepository['save']>[0]
  ): Promise<void> {
    await this.superStickerRepository.save(args)
  }

  async calculateTotalInJPY({
    where: { videoId }
  }: {
    where: { videoId: VideoId }
  }) {
    const chats = await this.superStickerRepository.findAll({
      where: { videoId }
    })
    const rates = await this.exchangeRateRepository.findAll()
    return {
      amountMicros: chats.calculateTotalInJPY(rates),
      count: chats.length
    }
  }
}
