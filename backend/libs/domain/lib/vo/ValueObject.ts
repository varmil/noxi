import { validateSync } from 'class-validator'

export abstract class ValueObject<T> {
  protected newInstance(item: T): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const ctor = Object.getPrototypeOf(this).constructor
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return new ctor(item)
  }

  constructor(protected readonly val: T) {
    const errors = validateSync(this, {
      forbidUnknownValues: false
    })
    if (errors.length) {
      throw new TypeError(
        JSON.stringify(
          errors.map(e => ({ constraints: e.constraints, value: e.value as T }))
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
