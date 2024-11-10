import { ValueObject } from '@domain/lib/ValueObject'

export abstract class BigIntValueObject extends ValueObject<bigint> {
  toString() {
    return this.get().toString()
  }
}
