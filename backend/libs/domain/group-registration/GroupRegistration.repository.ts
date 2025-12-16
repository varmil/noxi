import { GroupRegistration } from './GroupRegistration.entity'
import { GroupRegistrationId } from './GroupRegistrationId.vo'
import { GroupRegistrationStatus } from './GroupRegistrationStatus.vo'

export interface GroupRegistrationRepository {
  findAll({ limit }: { limit?: number }): Promise<GroupRegistration[]>
  create(
    registration: Omit<GroupRegistration, 'id' | 'appliedAt'>
  ): Promise<void>
  updateStatus(
    id: GroupRegistrationId,
    status: GroupRegistrationStatus
  ): Promise<void>
}
