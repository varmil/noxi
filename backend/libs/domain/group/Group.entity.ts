import { IsIn, IsNotEmpty } from 'class-validator'
import { ChannelIdsByGroup } from '@domain/group/list'
import { StringValueObject } from '@domain/lib/StringValueObject'
import { ChannelId, ChannelIds } from '@domain/youtube'
import { Expose, Transform } from 'class-transformer'

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

  @Expose()
  @Transform(({ value }: { value: { list: ChannelId[] } }) =>
    value.list.map(e => e.get())
  )
  get channelIds(): ChannelIds {
    return ChannelIdsByGroup[this.val]
  }
}
