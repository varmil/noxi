import { Injectable } from '@nestjs/common'
import { Group, GroupRepository } from '@domain/group'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class GroupRepositoryImpl implements GroupRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findOne({
    where: { channelId, videoId }
  }: Parameters<GroupRepository['findOne']>[0]) {
    if (channelId) {
      const row = await this.prismaInfraService.channel.findFirst({
        where: { id: channelId.get() }
      })
      if (!row) return null
      return new Group(row.group)
    }

    if (videoId) {
      const row = await this.prismaInfraService.youtubeStream.findUnique({
        where: { videoId: videoId.get() }
      })
      if (!row) return null
      return new Group(row.group)
    }

    return null
  }
}
