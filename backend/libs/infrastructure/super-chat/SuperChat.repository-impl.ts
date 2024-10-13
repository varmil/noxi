import { Injectable } from '@nestjs/common'
import { SuperChatRepository } from '@domain/super-xxx/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SuperChatRepositoryImpl implements SuperChatRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async save({
    data: {
      videoId,
      group,
      amountMicros,
      currency,
      amountDisplayString,
      tier,
      userComment
    }
  }: Parameters<SuperChatRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSuperChat.create({
      data: {
        videoId: videoId.get(),
        group: group.get(),
        amountMicros: amountMicros.get(),
        currency: currency.get(),
        amountDisplayString: amountDisplayString.get(),
        tier: tier.get(),
        userComment: userComment.get(),
        createdAt: new Date()
      }
    })
  }
}
