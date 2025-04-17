import { Injectable } from '@nestjs/common'
import { ChatCountRepository } from '@domain/stream-stats/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { ChatCountTranslator } from '@infra/stream-stats/ChatCountTranslator'

@Injectable()
export class ChatCountRepositoryImpl implements ChatCountRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findOne: ChatCountRepository['findOne'] = async ({
    where: { videoId },
    orderBy
  }) => {
    const row = await this.prismaInfraService.youtubeStreamChatCount.findFirst({
      where: { videoId: videoId.get() },
      orderBy
    })
    if (!row) return null
    return new ChatCountTranslator(row).translate()
  }

  async save({
    data: { videoId, nextContinuation, latestPublishedAt, createdAt }
  }: Parameters<ChatCountRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamChatCount.create({
      data: {
        videoId: videoId.get(),
        // 終了を考えて、nullを入れる
        nextContinuation: nextContinuation?.get() ?? null,
        latestPublishedAt: latestPublishedAt.get(),
        createdAt
      }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<ChatCountRepository['delete']>[0]) {
    await this.prismaInfraService.youtubeStreamChatCount.deleteMany({
      where: { videoId: videoId.get() }
    })
  }
}
