import { Injectable } from '@nestjs/common'
import {
  ChatEventsBundleQueueRepository,
  ChatEventsBundleQueues,
  ChatEventsBundleQueue
} from '@domain/chat-events-bundle-queue'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChatEventsBundleQueueRepositoryImpl
  implements ChatEventsBundleQueueRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    limit
  }: Parameters<ChatEventsBundleQueueRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.streamChatEventsBundleQueue.findMany({
        take: limit
      })

    return new ChatEventsBundleQueues(
      rows.map(
        row =>
          new ChatEventsBundleQueue({
            status: new QueueStatus(row.status),
            videoId: new VideoId(row.videoId),
            createdAt: row.createdAt
          })
      )
    )
  }

  async save({
    where,
    data
  }: Parameters<ChatEventsBundleQueueRepository['save']>[0]) {
    await this.prismaInfraService.streamChatEventsBundleQueue.upsert({
      where: { videoId: where.videoId.get() },
      update: { status: data.status.get() },
      create: { videoId: where.videoId.get(), status: data.status.get() }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<ChatEventsBundleQueueRepository['delete']>[0]) {
    await this.prismaInfraService.streamChatEventsBundleQueue.delete({
      where: { videoId: videoId.get() }
    })
  }
}
