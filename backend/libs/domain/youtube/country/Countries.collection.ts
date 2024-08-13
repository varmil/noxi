import { CountryCode } from '@domain/country'
import { Collection } from '@domain/lib/Collection'

export class Countries extends Collection<CountryCode> {
  constructor(protected readonly list: CountryCode[]) {
    super(list)
  }
}
