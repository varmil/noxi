import { Stream } from 'stream'
import { Collection } from '@domain/lib/Collection'

export class Streams extends Collection<Stream> {
  constructor(protected readonly list: Stream[]) {
    super(list)
  }
}
