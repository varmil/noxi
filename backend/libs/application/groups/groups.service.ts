import { Inject, Injectable } from '@nestjs/common'
import {
  GroupEntity,
  GroupRepository,
  GroupId,
  GroupName,
  GroupIconSrc
} from '@domain/group'

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: GroupRepository
  ) {}

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.findAll()
  }

  async findById(id: GroupId): Promise<GroupEntity | null> {
    return await this.groupRepository.findById(id)
  }

  async create(group: GroupEntity): Promise<void> {
    await this.groupRepository.create(group)
  }

  async update(
    id: GroupId,
    group: Partial<{ name: GroupName; iconSrc: GroupIconSrc }>
  ): Promise<void> {
    await this.groupRepository.update(id, group)
  }

  async delete(id: GroupId): Promise<void> {
    await this.groupRepository.delete(id)
  }
}
