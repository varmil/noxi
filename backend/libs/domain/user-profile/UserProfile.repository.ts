import { UserId, UserIds } from '@domain/user'
import {
  Description,
  Image,
  Name,
  UserProfile,
  UserProfiles
} from '@domain/user-profile'

export interface UserProfileRepository {
  findAll: (args: {
    where?: {
      userIds?: UserIds
    }
    orderBy?: {
      id: 'asc' | 'desc'
    }
    limit?: number
    offset?: number
  }) => Promise<UserProfiles>

  findById: (userId: UserId) => Promise<UserProfile | null>

  save: (args: {
    data: {
      name?: Name
      image?: Image
      description?: Description
    }
    where: {
      userId: UserId
    }
  }) => Promise<void>
}
