import { Collection } from '@domain/lib/Collection'
import { StreamVolumeTrend } from './StreamVolumeTrend.entity'

export class StreamVolumeTrends extends Collection<StreamVolumeTrend> {
  constructor(protected readonly list: StreamVolumeTrend[]) {
    super(list)
  }
}
