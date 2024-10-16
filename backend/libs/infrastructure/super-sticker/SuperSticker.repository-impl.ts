import { Injectable } from '@nestjs/common'
import { SuperStickerRepository } from '@domain/supers/sticker'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SuperStickerRepositoryImpl implements SuperStickerRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async save({
    data: {
      id,
      amountMicros,
      currency,
      amountDisplayString,
      tier,
      stickerId,
      author,
      videoId,
      group
    }
  }: Parameters<SuperStickerRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSuperSticker.upsert({
      where: { id: id.get() },
      create: {
        id: id.get(),
        amountMicros: amountMicros.get(),
        currency: currency.get(),
        amountDisplayString: amountDisplayString.get(),
        tier: tier.get(),
        stickerId: stickerId.get(),

        authorChannelId: author.channelId.get(),
        authorDisplayName: author.displayName.get(),
        authorProfileImageUrl: author.profileImageUrl.get(),
        authorIsChatSponsor: author.isChatSponsor.get(),

        videoId: videoId.get(),
        group: group.get(),
        createdAt: new Date()
      },
      update: {}
    })
  }
}
