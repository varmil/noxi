import { validateSync } from 'class-validator'

export abstract class ValueObject<T> {
  constructor(protected readonly val: T) {
    const errors = validateSync(this)
    if (errors.length) {
      throw new TypeError(
        JSON.stringify(
          errors.map(e => ({ constraints: e.constraints, value: e.value }))
        )
      )
    }
  }

  get(): T {
    return this.val
  }

  equals(vo: ValueObject<T>): boolean {
    if (this.constructor.name !== vo.constructor.name) return false
    return this.get() === vo.get()
  }
}
