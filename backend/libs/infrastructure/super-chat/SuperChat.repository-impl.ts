import { Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { SuperChatRepository, SuperChats } from '@domain/supers/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { SuperChatTranslator } from '@infra/super-chat/SuperChatTranslator'
import { VideoId, ChannelId, Group } from '@domain'

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

  count: SuperChatRepository['count'] = async ({
    where: { channelId, videoId, group, createdBefore, createdAfter }
  }) => {
    return await this.prismaInfraService.youtubeStreamSuperChat.count({
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
      }
    })
  }

  async save({
    data: {
      id,
      amountMicros,
      currency,
      amountDisplayString,
      userComment,
      author,
      videoId,
      group,
      createdAt
    }
  }: Parameters<SuperChatRepository['save']>[0]) {
    try {
      await this.prismaInfraService.youtubeStreamSuperChat.upsert({
        where: { id: id.get() },
        create: {
          id: id.get(),
          amountMicros: amountMicros.toBigInt(),
          currency: currency.get(),
          amountDisplayString: amountDisplayString.get(),
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // UNIQUE制約違反が普通に出るので握りつぶす
          return
        }
      }
      throw error
    }
  }
}
