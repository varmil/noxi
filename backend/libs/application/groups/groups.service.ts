import { Inject, Injectable } from '@nestjs/common'
import {
  Group,
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

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.findAll()
  }

  async findById(id: string): Promise<Group | null> {
    return await this.groupRepository.findById(new GroupId(id))
  }

  async create(group: Group): Promise<void> {
    await this.groupRepository.create(group)
  }

  async update(
    id: string,
    group: Partial<{ name: string; iconSrc: string }>
  ): Promise<void> {
    const updateData: Partial<{ name: GroupName; iconSrc: GroupIconSrc }> = {}
    if (group.name) updateData.name = new GroupName(group.name)
    if (group.iconSrc) updateData.iconSrc = new GroupIconSrc(group.iconSrc)

    await this.groupRepository.update(new GroupId(id), updateData)
  }

  async delete(id: string): Promise<void> {
    await this.groupRepository.delete(new GroupId(id))
  }
}
