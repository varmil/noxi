import BigNumber from 'bignumber.js'
import { Exclude } from 'class-transformer'
import { ValueObject } from '@domain/lib/vo/ValueObject'

export abstract class BigNumberValueObject extends ValueObject<BigNumber> {
  @Exclude()
  toString() {
    return this.toBigInt().toString()
  }

  @Exclude()
  toFixed() {
    return this.get().toFixed()
  }

  @Exclude()
  toBigInt() {
    return BigInt(this.get().toFixed(0))
  }

  @Exclude()
  plus(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().plus(other))
  }

  @Exclude()
  minus(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().minus(other))
  }

  @Exclude()
  times(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().times(other))
  }

  @Exclude()
  div(other: BigNumber.Value | BigNumberValueObject) {
    if (other instanceof BigNumberValueObject) {
      other = other.get()
    }
    return this.newInstance(this.get().div(other))
  }

  @Exclude()
  round() {
    return this.newInstance(this.get().decimalPlaces(0))
  }
}
