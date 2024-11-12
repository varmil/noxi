import BigNumber from 'bignumber.js'
import { ValueObject } from '@domain/lib/vo/ValueObject'

export abstract class BigNumberValueObject extends ValueObject<BigNumber> {
  toString() {
    return this.toBigInt().toString()
  }

  toFixed() {
    return this.get().toFixed()
  }

  toBigInt() {
    return BigInt(this.get().toFixed(0))
  }

  plus(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().plus(other))
  }

  div(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().div(other))
  }

  round() {
    return this.newInstance(this.get().decimalPlaces(0))
  }
}
