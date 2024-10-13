import { Injectable } from '@nestjs/common'
import { SuperStickerRepository } from '@domain/super-xxx/sticker'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SuperStickerRepositoryImpl implements SuperStickerRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async save({
    data: {
      videoId,
      group,
      amountMicros,
      currency,
      amountDisplayString,
      tier,
      stickerId
    }
  }: Parameters<SuperStickerRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSuperSticker.create({
      data: {
        videoId: videoId.get(),
        group: group.get(),
        amountMicros: amountMicros.get(),
        currency: currency.get(),
        amountDisplayString: amountDisplayString.get(),
        tier: tier.get(),
        stickerId: stickerId.get(),
        createdAt: new Date()
      }
    })
  }
}
