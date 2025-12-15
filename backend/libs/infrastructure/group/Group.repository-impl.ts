import { Injectable } from '@nestjs/common'
import {
  GroupEntity,
  GroupRepository,
  GroupId,
  GroupName,
  GroupIconSrc
} from '@domain/group'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class GroupRepositoryImpl implements GroupRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll(): Promise<GroupEntity[]> {
    const rows = await this.prismaInfraService.group.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return rows.map(
      row =>
        new GroupEntity({
          id: new GroupId(row.id),
          name: new GroupName(row.name),
          iconSrc: new GroupIconSrc(row.iconSrc)
        })
    )
  }

  async findById(id: GroupId): Promise<GroupEntity | null> {
    const row = await this.prismaInfraService.group.findUnique({
      where: { id: id.get() }
    })

    if (!row) return null

    return new GroupEntity({
      id: new GroupId(row.id),
      name: new GroupName(row.name),
      iconSrc: new GroupIconSrc(row.iconSrc)
    })
  }

  async create(group: GroupEntity): Promise<void> {
    await this.prismaInfraService.group.create({
      data: {
        id: group.id.get(),
        name: group.name.get(),
        iconSrc: group.iconSrc.get()
      }
    })
  }

  async update(
    id: GroupId,
    group: Partial<{ name: GroupName; iconSrc: GroupIconSrc }>
  ): Promise<void> {
    const updateData: { name?: string; iconSrc?: string } = {}
    if (group.name) updateData.name = group.name.get()
    if (group.iconSrc) updateData.iconSrc = group.iconSrc.get()

    await this.prismaInfraService.group.update({
      where: { id: id.get() },
      data: updateData
    })
  }

  async delete(id: GroupId): Promise<void> {
    await this.prismaInfraService.group.delete({
      where: { id: id.get() }
    })
  }
}
