import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export const StatusStrings = [
  'pending',
  'approved',
  'done',
  'rejected'
] as const

export type StatusString = (typeof StatusStrings)[number]

export class Status extends StringValueObject {
  @IsNotEmpty()
  @IsIn(StatusStrings)
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
