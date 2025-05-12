import { User, UserId, UserIds, Users } from '@domain/user'

export interface UserRepository {
  findAll: (args: {
    where: {
      ids?: UserIds
    }
    orderBy: {
      id: 'asc' | 'desc'
    }
    limit?: number
    offset?: number
  }) => Promise<Users>

  findById: (userId: UserId) => Promise<User | null>

  save: (args: User) => Promise<void>

  deleteById: (userId: UserId) => Promise<void>
}
