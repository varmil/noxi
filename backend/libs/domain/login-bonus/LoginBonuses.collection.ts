import { Collection } from '@domain/lib/Collection'
import { LoginBonus } from '@domain/login-bonus'

export class LoginBonuses extends Collection<LoginBonus> {
  constructor(protected readonly list: LoginBonus[]) {
    super(list)
  }
}
