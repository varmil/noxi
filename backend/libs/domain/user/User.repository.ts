import { User, UserId } from '@domain/user'

export interface UserRepository {
  findById: (userId: UserId) => Promise<User | null>

  deleteById: (userId: UserId) => Promise<void>
}
