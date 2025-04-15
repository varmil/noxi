import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/generated/client'
import { MembershipRepository, Memberships } from '@domain/membership'
import { MembershipTranslator } from '@infra/membership/MembershipTranslator'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class MembershipRepositoryImpl implements MembershipRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { videoId, group, createdBefore, createdAfter },
    limit
  }: Parameters<MembershipRepository['findAll']>[0]) {
    const rows = await this.prismaInfraService.streamMembership.findMany({
      where: {
        videoId: videoId?.get(),
        group: group?.get(),
        createdAt: {
          gte: createdAfter,
          lte: createdBefore
        }
      },
      take: limit
    })
    return new Memberships(
      rows.map(row => new MembershipTranslator(row).translate())
    )
  }

  count: MembershipRepository['count'] = async ({
    where: { videoId, group, createdBefore, createdAfter }
  }) => {
    return await this.prismaInfraService.streamMembership.count({
      where: {
        videoId: videoId?.get(),
        group: group?.get(),
        createdAt: {
          gte: createdAfter,
          lte: createdBefore
        }
      }
    })
  }

  async save({
    data: { id, count, isGift, author, videoId, group, createdAt }
  }: Parameters<MembershipRepository['save']>[0]) {
    try {
      await this.prismaInfraService.streamMembership.upsert({
        where: { id: id.get() },
        create: {
          id: id.get(),
          count: count.get(),
          isGift: isGift.get(),

          authorChannelId: author.channelId.get(),
          authorDisplayName: author.displayName.get(),
          authorProfileImageUrl: author.profileImageUrl.get(),

          videoId: videoId.get(),
          group: group.get(),
          createdAt: createdAt.get()
        },
        update: {}
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // UNIQUE制約違反が普通に出るので握りつぶす
          return
        }
      }
      throw error
    }
  }
}
