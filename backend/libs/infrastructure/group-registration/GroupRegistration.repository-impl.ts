import { Injectable } from '@nestjs/common'
import { GroupId, GroupName, GroupIconSrc } from '@domain/group'
import {
  GroupRegistration,
  GroupRegistrationRepository,
  GroupRegistrationId,
  GroupRegistrationStatus,
  GroupRegistrationAppliedAt
} from '@domain/group-registration'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class GroupRegistrationRepositoryImpl
  implements GroupRegistrationRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({ limit = 30 }: { limit?: number } = {}): Promise<
    GroupRegistration[]
  > {
    const rows = await this.prismaInfraService.groupRegistration.findMany({
      orderBy: { appliedAt: 'desc' },
      take: limit
    })

    return rows.map(
      row =>
        new GroupRegistration({
          id: new GroupRegistrationId(row.id),
          groupId: new GroupId(row.groupId),
          name: new GroupName(row.name),
          iconSrc: new GroupIconSrc(row.iconSrc),
          status: new GroupRegistrationStatus(
            row.status as 'pending' | 'approved' | 'rejected'
          ),
          appliedAt: new GroupRegistrationAppliedAt(row.appliedAt)
        })
    )
  }

  async create(
    registration: Omit<GroupRegistration, 'id' | 'appliedAt'>
  ): Promise<void> {
    await this.prismaInfraService.groupRegistration.create({
      data: {
        groupId: registration.groupId.get(),
        name: registration.name.get(),
        iconSrc: registration.iconSrc.get(),
        status: registration.status.get()
      }
    })
  }

  async updateStatus(
    id: GroupRegistrationId,
    status: GroupRegistrationStatus
  ): Promise<void> {
    await this.prismaInfraService.groupRegistration.update({
      where: { id: id.get() },
      data: { status: status.get() }
    })
  }
}
