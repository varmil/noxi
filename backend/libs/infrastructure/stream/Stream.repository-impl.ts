import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/generated/client'
import { GroupId } from '@domain/group'
import {
  Stream,
  StreamFindAllWhere,
  StreamRepository,
  Streams
} from '@domain/stream'
import { Thumbnails, VideoId, VideoTitle } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { StreamTranslator } from '@infra/stream/StreamTranslator'
import { UpsertYoutubeStream } from '@infra/stream/UpsertYoutubeStream'

const toPrismaWhere = (
  where: StreamFindAllWhere
): Prisma.YoutubeStreamWhereInput => {
  const {
    title,
    status,
    videoIds,
    group,
    channelId,
    scheduledStartTime,
    actualEndTime,
    peakConcurrentViewers,
    avgConcurrentViewers,
    OR
  } = where
  return {
    title: { contains: title?.get(), mode: 'insensitive' },
    status: status?.get(),
    videoId: { in: videoIds?.map(e => e.get()) },
    group: group?.get(),
    channelId: channelId?.get(),
    channel: { gender: where.gender?.get() },
    scheduledStartTime,
    actualEndTime,
    maxViewerCount: peakConcurrentViewers,
    averageConcurrentViewers: avgConcurrentViewers,
    OR: OR?.map(e => ({ ...e, status: e.status.get() }))
  }
}

@Injectable()
export class StreamRepositoryImpl implements StreamRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<StreamRepository['findAll']>[0]) {
    const rows = await this.prismaInfraService.youtubeStream.findMany({
      where: toPrismaWhere(where),
      orderBy,
      take: limit,
      skip: offset
    })

    return new Streams(rows.map(row => new StreamTranslator(row).translate()))
  }

  findAllLight: StreamRepository['findAllLight'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.youtubeStream.findMany({
      select: {
        videoId: true,
        title: true,
        group: true
      },
      // Remove members only rows (views != null)
      where: {
        ...toPrismaWhere(where),
        views: { not: null }
      },
      orderBy,
      take: limit,
      skip: offset
    })
    // Remove members only rows (title)
    return rows
      .filter(row => !Stream.isMembersOnly(new VideoTitle(row.title)))
      .map(row => ({
        videoId: new VideoId(row.videoId),
        title: new VideoTitle(row.title),
        group: new GroupId(row.group)
      }))
  }

  count: StreamRepository['count'] = async ({ where }) => {
    return await this.prismaInfraService.youtubeStream.count({
      where: toPrismaWhere(where)
    })
  }

  async findOne({
    where: { videoId }
  }: Parameters<StreamRepository['findOne']>[0]) {
    const row = await this.prismaInfraService.youtubeStream.findUnique({
      where: { videoId: videoId.get() }
    })

    if (!row) return null
    return new StreamTranslator(row).translate()
  }

  async save({ data: stream }: Parameters<StreamRepository['save']>[0]) {
    const toPrisma = new UpsertYoutubeStream(stream)
    await this.prismaInfraService.youtubeStream.upsert({
      where: { videoId: stream.videoId.get() },
      update: toPrisma.translateToUpdate(),
      create: toPrisma.translateToCreate()
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<StreamRepository['delete']>[0]) {
    await this.prismaInfraService.youtubeStream.delete({
      where: { videoId: videoId.get() }
    })
  }

  async updateDuration({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateDuration']>[0]): Promise<void> {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: { duration: data.get() }
    })
  }

  async updateStreamTimes({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateStreamTimes']>[0]) {
    try {
      await this.prismaInfraService.youtubeStream.update({
        where: { videoId: videoId.get() },
        data: {
          scheduledStartTime: data.scheduledStartTime,
          actualStartTime: data.actualStartTime?.get(),
          actualEndTime: data.actualEndTime?.get(),
          status: data.streamStatus.get()
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // An operation failed because it depends on one or more records
        // that were required but not found.
        if (error.code === 'P2025') {
          return
        }
      }
      throw error
    }
  }

  updateMetrics: (
    args: Parameters<StreamRepository['updateMetrics']>[0]
  ) => Promise<void> = async ({ where: { videoId }, data }) => {
    const {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    } = data
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: {
        maxViewerCount: peakConcurrentViewers,
        averageConcurrentViewers: avgConcurrentViewers,
        chatMessages,
        // NOTE: null =「メンバー限定」判定（やや不正確だが）
        views,
        likeCount: likes
      }
    })
  }

  async updateLikeCount({
    where: { videoId },
    data
  }: Parameters<StreamRepository['updateLikeCount']>[0]): Promise<void> {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: { likeCount: data }
    })
  }

  updateThumbnails: (args: {
    where: { videoId: VideoId }
    data: Thumbnails
  }) => Promise<void> = async ({ where: { videoId }, data }) => {
    await this.prismaInfraService.youtubeStream.update({
      where: { videoId: videoId.get() },
      data: { thumbnails: data }
    })
  }
}
