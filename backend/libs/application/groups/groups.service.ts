import { Inject, Injectable } from '@nestjs/common'
import { AllGroups, Group, GroupRepository, Groups } from '@domain/group'

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: GroupRepository
  ) {}

  findAll(): Groups {
    return AllGroups
  }

  async findOne(
    args: Parameters<GroupRepository['findOne']>[0]
  ): Promise<Group | null> {
    return await this.groupRepository.findOne(args)
  }
}
