import { StreamVolumeTrend } from './StreamVolumeTrend.entity'

export class StreamVolumeTrends {
  constructor(private readonly list: StreamVolumeTrend[]) {}

  getList(): StreamVolumeTrend[] {
    return this.list
  }

  [Symbol.iterator]() {
    return this.list[Symbol.iterator]()
  }
}
