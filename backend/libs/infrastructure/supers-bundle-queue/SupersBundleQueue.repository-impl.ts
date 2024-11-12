import { Injectable } from '@nestjs/common'
import { QueueStatus } from '@domain/queue'
import {
  SupersBundleQueueRepository,
  SupersBundleQueues,
  SupersBundleQueue
} from '@domain/supers-bundle-queue'
import { VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class SupersBundleQueueRepositoryImpl
  implements SupersBundleQueueRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    limit
  }: Parameters<SupersBundleQueueRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.youtubeStreamSupersBundleQueue.findMany({
        take: limit
      })

    return new SupersBundleQueues(
      rows.map(
        row =>
          new SupersBundleQueue({
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
  }: Parameters<SupersBundleQueueRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamSupersBundleQueue.upsert({
      where: { videoId: where.videoId.get() },
      update: { status: data.status.get() },
      create: { videoId: where.videoId.get(), status: data.status.get() }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<SupersBundleQueueRepository['delete']>[0]) {
    await this.prismaInfraService.youtubeStreamSupersBundleQueue.delete({
      where: { videoId: videoId.get() }
    })
  }
}
