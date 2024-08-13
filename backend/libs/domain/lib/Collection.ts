import { Exclude } from 'class-transformer'

export abstract class Collection<T> {
  constructor(protected readonly list: T[]) {}

  protected newInstance(items: T[]): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const ctor = Object.getPrototypeOf(this).constructor
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return new ctor(items)
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.list[Symbol.iterator]()
  }

  *entries(): IterableIterator<[number, T]> {
    for (let index = 0; index < this.list.length; index++) {
      yield [index, this.list[index]]
    }
  }

  @Exclude()
  map = <U>(fn: (value: T, index: number) => U) => this.list.map(fn)

  @Exclude()
  filter(callback: (item: T, index?: number) => boolean): this {
    return this.newInstance(this.list.filter(callback))
  }

  @Exclude()
  slice = (start?: number, end?: number): this =>
    this.newInstance(this.list.slice(start, end))

  @Exclude()
  first = (): T | undefined => this.list[0]

  @Exclude()
  take = (n: number) =>
    this.newInstance(this.list.slice(0, Math.min(n, this.list.length)))

  @Exclude()
  get length(): number {
    return this.list.length
  }
}
