import { Collection } from '@domain/lib/Collection'
import { UserProfile } from './UserProfile.entity'

export class UserProfiles extends Collection<UserProfile> {
  constructor(protected readonly list: UserProfile[]) {
    super(list)
  }
}
