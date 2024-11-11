import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class StreamStatus extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: 'ended' | 'live' | 'scheduled'

  constructor(val: 'ended' | 'live' | 'scheduled') {
    super(val)
    this.val = val
  }
}

export const StreamStatusEnded = new StreamStatus('ended')
export const StreamStatusLive = new StreamStatus('live')
export const StreamStatusScheduled = new StreamStatus('scheduled')
