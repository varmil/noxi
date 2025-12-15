import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export const GroupRegistrationStatusStrings = [
  'pending',
  'approved',
  'rejected'
] as const

export type GroupRegistrationStatusString =
  (typeof GroupRegistrationStatusStrings)[number]

export class GroupRegistrationStatus extends StringValueObject {
  @IsNotEmpty()
  @IsIn(GroupRegistrationStatusStrings)
  protected readonly val: GroupRegistrationStatusString

  constructor(val: GroupRegistrationStatusString) {
    super(val)
    this.val = val
  }
}
