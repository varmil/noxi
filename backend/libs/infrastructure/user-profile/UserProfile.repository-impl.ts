import { Injectable } from '@nestjs/common'
import { UserId } from '@domain/user'
import {
  Description,
  Name,
  Image,
  UserProfile,
  UserProfileRepository,
  UserProfiles,
  Username
} from '@domain/user-profile'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class UserProfileRepositoryImpl implements UserProfileRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  /** 主体は「User」なので、Userを先に取得してからUserProfileを取得する */
  findAll: UserProfileRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const users = await this.prismaInfraService.user.findMany({
      where: { id: { in: where?.userIds?.map(e => e.get()) } },
      orderBy,
      take: limit,
      skip: offset
    })
    const profiles = await this.prismaInfraService.userProfile.findMany({
      where: { userId: { in: users.map(e => e.id) } }
    })
    return new UserProfiles(
      users.map(user => {
        const profile = profiles.find(p => p.userId === user.id)
        return new UserProfile({
          userId: new UserId(user.id),
          name: new Name(user.name ?? 'No name'),
          username: new Username(profile?.username ?? 'ERROR'), // 右辺はありえない
          image: new Image(user.image ?? 'No image'),
          description: new Description(profile?.description ?? '')
        })
      })
    )
  }

  findById: UserProfileRepository['findById'] = async userId => {
    const user = await this.prismaInfraService.user.findUnique({
      where: { id: userId.get() }
    })
    const profile = await this.prismaInfraService.userProfile.findUnique({
      where: { userId: userId.get() }
    })
    if (!user) return null
    return new UserProfile({
      userId: new UserId(user.id),
      name: new Name(user.name ?? 'No name'),
      username: new Username(profile?.username ?? 'ERROR'), // 右辺はありえない
      image: new Image(user.image ?? 'No image'),
      description: new Description(profile?.description ?? '')
    })
  }

  save: UserProfileRepository['save'] = async ({ data, where }) => {
    await this.prismaInfraService.$transaction(async tx => {
      await tx.user.update({
        where: { id: where.userId.get() },
        data: {
          name: data.name?.get(),
          image: data.image?.get()
        }
      })
      await tx.userProfile.upsert({
        where: { userId: where.userId.get() },
        create: {
          userId: where.userId.get(),
          username: data.username?.get() ?? 'ERROR', // 右辺はありえない
          description: data.description?.get() ?? ''
        },
        update: {
          username: data.username?.get() ?? undefined,
          description: data.description?.get() ?? ''
        }
      })
    })
  }
}
