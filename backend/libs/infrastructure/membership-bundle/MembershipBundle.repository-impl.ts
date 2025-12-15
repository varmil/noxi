import { Injectable } from '@nestjs/common'
import {
  Prisma,
  StreamMembershipBundle as PrismaStreamMembershipBundle
} from '@prisma/generated/client'
import { GroupName } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { Count } from '@domain/membership'
import {
  MembershipBundle,
  MembershipBundleRepository,
  MembershipBundles,
  MembershipBundleSum,
  MembershipBundleSums
} from '@domain/membership-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class MembershipBundleRepositoryImpl
  implements MembershipBundleRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<MembershipBundleRepository['findAll']>[0]) {
    const whereQuery: Prisma.StreamMembershipBundleWhereInput | undefined =
      where
        ? {
            videoId: { in: where.videoIds?.map(e => e.get()) },
            channelId: where.channelId?.get(),
            group: where.group?.get(),
            actualEndTime: where.actualEndTime,
            createdAt: where.createdAt,
            channel: { gender: where.gender?.get() }
          }
        : undefined

    const rows = await this.prismaInfraService.streamMembershipBundle.findMany({
      where: whereQuery,
      orderBy,
      take: limit,
      skip: offset
    })

    return new MembershipBundles(rows.map(row => this.toDomain(row)))
  }

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<MembershipBundle | null> = async ({ where: { videoId } }) => {
    const row = await this.prismaInfraService.streamMembershipBundle.findUnique(
      {
        where: { videoId: videoId.get() }
      }
    )
    if (!row) return null
    return this.toDomain(row)
  }

  async save({ data }: Parameters<MembershipBundleRepository['save']>[0]) {
    const {
      videoId,
      channelId,
      amountMicros,
      count,
      actualStartTime,
      actualEndTime,
      group
    } = data

    const update = {
      channelId: channelId.get(),
      amountMicros: amountMicros.toBigInt(),
      count: count.get(),
      actualStartTime: actualStartTime.get(),
      actualEndTime: actualEndTime?.get() ?? null,
      group: group.get()
    }

    await this.prismaInfraService.streamMembershipBundle.upsert({
      where: { videoId: videoId.get() },
      update,
      create: { videoId: videoId.get(), ...update }
    })
  }

  async sum(args: Parameters<MembershipBundleRepository['sum']>[0]) {
    const count = args.where.count && {
      gt: args.where.count.gt?.get(),
      gte: args.where.count.gte?.get(),
      lt: args.where.count.lt?.get(),
      lte: args.where.count.lte?.get()
    }
    const rows = await this.prismaInfraService.streamMembershipBundle.groupBy({
      by: ['channelId'],
      where: {
        createdAt: args.where.createdAt,
        group: args.where.group?.get(),
        channelId: { in: args.where.channelIds?.map(e => e.get()) },
        channel: { gender: args.where.gender?.get() },
        count
      },
      _sum: { amountMicros: true, count: true },
      orderBy: args.orderBy,
      take: args.limit,
      skip: args.offset
    })
    return new MembershipBundleSums(
      rows.map(
        row =>
          new MembershipBundleSum({
            channelId: new ChannelId(row.channelId),
            amountMicros: new AmountMicros(row._sum.amountMicros ?? 0),
            count: new Count(row._sum.count ?? 0)
          })
      )
    )
  }

  private toDomain(row: PrismaStreamMembershipBundle) {
    return new MembershipBundle({
      videoId: new VideoId(row.videoId),
      channelId: new ChannelId(row.channelId),
      amountMicros: new AmountMicros(row.amountMicros),
      count: new Count(row.count),
      actualStartTime: new ActualStartTime(row.actualStartTime),
      actualEndTime: row.actualEndTime
        ? new ActualEndTime(row.actualEndTime)
        : undefined,
      group: new GroupName(row.group)
    })
  }
}
