import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia'
] as const

export type GroupString = (typeof GroupStrings)[number]

export class Group extends StringValueObject<GroupString> {
  @IsNotEmpty({ message: 'Group cannot be empty' })
  @IsIn(GroupStrings)
  protected readonly val: GroupString

  constructor(val: string) {
    super(val as GroupString)
    this.val = val as GroupString
  }
}