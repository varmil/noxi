import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export class QueueStatus extends StringValueObject {
  @IsNotEmpty()
  @IsIn(['unprocessed', 'inProgress', 'completed'])
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}

export const QueueStatusUnprocessed = new QueueStatus('unprocessed')
export const QueueStatusInProgress = new QueueStatus('inProgress')
export const QueueStatusCompleted = new QueueStatus('completed')
