import { Injectable } from '@nestjs/common'
import { SuperChatRepository, SuperChats } from '@domain/supers/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { SuperChatTranslator } from '@infra/super-chat/SuperChatTranslator'

@Injectable()
export class SuperChatRepositoryImpl implements SuperChatRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { channelId, videoId, group, createdBefore, createdAfter },
    orderBy,
    limit
  }: Parameters<SuperChatRepository['findAll']>[0]) {
    const rows = await this.prismaInfraService.youtubeStreamSuperChat.findMany({
      where: {
        videoId: videoId?.get(),
        group: group?.get(),
        createdAt: {
          gte: createdAfter,
          lte: createdBefore
        },
        stream: {
          channelId: channelId?.get()
        }
      },
      orderBy,
      take: limit
    })
    return new SuperChats(
      rows.map(row => new SuperChatTranslator(row).translate())
    )
  }

  async save({
    data: {
      id,
      amountMicros,
      currency,
      amountDisplayString,
      tier,
      userComment,
      author,
      videoId,
      group,
      createdAt
    }
  }: Parameters<SuperChatRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSuperChat.upsert({
      where: { id: id.get() },
      create: {
        id: id.get(),
        amountMicros: amountMicros.get(),
        currency: currency.get(),
        amountDisplayString: amountDisplayString.get(),
        tier: tier.get(),
        userComment: userComment.get(),

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
