import { Injectable } from '@nestjs/common'
import { SuperStickerRepository, SuperStickers } from '@domain/supers/sticker'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { SuperStickerTranslator } from '@infra/super-sticker/SuperStickerTranslator'

@Injectable()
export class SuperStickerRepositoryImpl implements SuperStickerRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  // TODO: join Stream with channelId
  async findAll({
    where: { videoId, group },
    orderBy,
    limit
  }: Parameters<SuperStickerRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.youtubeStreamSuperSticker.findMany({
        where: {
          videoId: videoId?.get(),
          group: group?.get()
        },
        orderBy,
        take: limit
      })
    return new SuperStickers(
      rows.map(row => new SuperStickerTranslator(row).translate())
    )
  }

  async save({
    data: {
      id,
      amountMicros,
      currency,
      amountDisplayString,
      stickerId,
      author,
      videoId,
      group,
      createdAt
    }
  }: Parameters<SuperStickerRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSuperSticker.upsert({
      where: { id: id.get() },
      create: {
        id: id.get(),
        amountMicros: amountMicros.toBigInt(),
        currency: currency.get(),
        amountDisplayString: amountDisplayString.get(),
        stickerId: stickerId.get(),

        authorChannelId: author.channelId.get(),
        authorDisplayName: author.displayName.get(),
        authorProfileImageUrl: author.profileImageUrl.get(),
        authorIsChatSponsor: author.isChatSponsor.get(),

        videoId: videoId.get(),
        group: group.get(),
        createdAt: createdAt.get()
      },
      update: {}
    })
  }
}
