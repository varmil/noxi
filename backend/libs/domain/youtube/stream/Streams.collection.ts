import { Collection } from '@domain/lib/Collection'
import { Stream } from '@domain/youtube'

export class Streams extends Collection<Stream> {
  constructor(protected readonly list: Stream[]) {
    super(list)
  }
}
