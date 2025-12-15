import { Group } from './Group.entity'
import { GroupIconSrc } from './GroupIconSrc.vo'
import { GroupId } from './GroupId.vo'
import { GroupName } from './GroupName.vo'

export interface GroupRepository {
  findAll(): Promise<Group[]>
  findById(id: GroupId): Promise<Group | null>
  create(group: Group): Promise<void>
  update(
    id: GroupId,
    group: Partial<{ name: GroupName; iconSrc: GroupIconSrc }>
  ): Promise<void>
  delete(id: GroupId): Promise<void>
}
