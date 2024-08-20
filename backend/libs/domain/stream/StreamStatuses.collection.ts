import { Collection } from '@domain/lib/Collection'
import { StreamStatus } from '@domain/stream/StreamStatus.vo'

export class StreamStatuses extends Collection<StreamStatus> {
  constructor(protected readonly list: StreamStatus[]) {
    super(list)
  }
}
