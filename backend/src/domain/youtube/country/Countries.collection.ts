import { Exclude } from 'class-transformer'
import { CountryCode } from '@domain/country'

export class Countries {
  constructor(private readonly list: CountryCode[]) {}

  @Exclude()
  get length() {
    return this.list.length
  }

  @Exclude()
  map = <U>(
    callbackfn: (value: CountryCode, index: number, array: CountryCode[]) => U
  ): U[] => this.list.map(callbackfn)
}
