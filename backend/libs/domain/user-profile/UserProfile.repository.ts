import { UserId, UserIds } from '@domain/user'
import {
  Description,
  Image,
  Name,
  Username,
  Website,
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

  findByUsername: (username: Username) => Promise<UserProfile | null>

  findById: (userId: UserId) => Promise<UserProfile | null>

  save: (args: {
    data: {
      name?: Name
      username?: Username
      image?: Image
      description?: Description
      website?: Website
    }
    where: {
      userId: UserId
    }
  }) => Promise<void>
}
