import { GroupName } from '@domain/group'
import { Membership, Memberships } from '@domain/membership'
import { VideoId } from '@domain/youtube'

export interface MembershipRepository {
  findAll: (args: {
    where: {
      videoId?: VideoId
      group?: GroupName
      createdBefore?: Date
      createdAfter?: Date
    }
    limit?: number
  }) => Promise<Memberships>

  count: (args: {
    where: {
      videoId?: VideoId
      group?: GroupName
      createdBefore?: Date
      createdAfter?: Date
    }
  }) => Promise<number>

  save: (args: { data: Membership }) => Promise<void>
}
