import { ConcurrentViewerTrend } from './ConcurrentViewerTrend.entity'

export class ConcurrentViewerTrends {
  constructor(private readonly list: ConcurrentViewerTrend[]) {}

  getList(): ConcurrentViewerTrend[] {
    return this.list
  }

  [Symbol.iterator]() {
    return this.list[Symbol.iterator]()
  }
}
