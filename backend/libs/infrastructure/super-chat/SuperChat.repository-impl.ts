import { Injectable } from '@nestjs/common'
import { SuperChatRepository } from '@domain/supers/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SuperChatRepositoryImpl implements SuperChatRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

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
      group
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
        createdAt: new Date()
      },
      update: {}
    })
  }
}
