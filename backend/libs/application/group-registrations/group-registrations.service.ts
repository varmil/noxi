import { Inject, Injectable } from '@nestjs/common'
import { GroupId, GroupName, GroupIconSrc } from '@domain/group'
import {
  GroupRegistration,
  GroupRegistrationRepository,
  GroupRegistrationId,
  GroupRegistrationStatus,
  GroupRegistrationAppliedAt
} from '@domain/group-registration'

@Injectable()
export class GroupRegistrationsService {
  constructor(
    @Inject('GroupRegistrationRepository')
    private readonly groupRegistrationRepository: GroupRegistrationRepository
  ) {}

  async findAll({ limit = 30 }: { limit?: number } = {}): Promise<
    GroupRegistration[]
  > {
    return await this.groupRegistrationRepository.findAll({ limit })
  }

  async create(args: {
    groupId: GroupId
    name: GroupName
    iconSrc: GroupIconSrc
  }): Promise<void> {
    const registration = new GroupRegistration({
      id: new GroupRegistrationId(0), // 0で初期化（DBで自動生成される）
      groupId: args.groupId,
      name: args.name,
      iconSrc: args.iconSrc,
      status: new GroupRegistrationStatus('pending'),
      appliedAt: new GroupRegistrationAppliedAt(new Date()) // 現在時刻で作成
    })
    await this.groupRegistrationRepository.create(registration)
  }

  async updateStatus(
    id: GroupRegistrationId,
    status: GroupRegistrationStatus
  ): Promise<void> {
    await this.groupRegistrationRepository.updateStatus(id, status)
  }
}
