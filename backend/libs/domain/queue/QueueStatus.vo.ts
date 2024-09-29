import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export class QueueStatus extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsIn(['unprocessed', 'inProgress', 'completed'])
  protected readonly val: 'unprocessed' | 'inProgress' | 'completed'

  constructor(val: 'unprocessed' | 'inProgress' | 'completed') {
    super(val)
    this.val = val
  }
}

export const QueueStatusUnprocessed = new QueueStatus('unprocessed')
export const QueueStatusInProgress = new QueueStatus('inProgress')
export const QueueStatusCompleted = new QueueStatus('completed')
