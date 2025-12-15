import { GroupEntity } from './GroupEntity'
import { GroupIconSrc } from './GroupIconSrc.vo'
import { GroupId } from './GroupId.vo'
import { GroupName } from './GroupName.vo'

export interface GroupRepository {
  findAll(): Promise<GroupEntity[]>
  findById(id: GroupId): Promise<GroupEntity | null>
  create(group: GroupEntity): Promise<void>
  update(
    id: GroupId,
    group: Partial<{ name: GroupName; iconSrc: GroupIconSrc }>
  ): Promise<void>
  delete(id: GroupId): Promise<void>
}
