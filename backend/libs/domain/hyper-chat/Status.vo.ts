import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const STATUSES = ['pending', 'completed', 'failed'] as const
export type StatusValue = (typeof STATUSES)[number]

export class Status extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsIn(STATUSES)
  protected readonly val: StatusValue

  constructor(val: StatusValue) {
    super(val)
    this.val = val
  }

  isPending(): boolean {
    return this.val === 'pending'
  }

  isCompleted(): boolean {
    return this.val === 'completed'
  }

  isFailed(): boolean {
    return this.val === 'failed'
  }
}
