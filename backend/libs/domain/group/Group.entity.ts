import { Exclude, Expose, Transform } from 'class-transformer'
import { IsIn, IsNotEmpty } from 'class-validator'
import { ChannelIdsByGroup, ChannelsByGroup } from '@domain/group/list'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'
import { ChannelId, ChannelIds } from '@domain/youtube'

export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia',
  'nijisanji',
  'nijisanji-en',
  'vspo',
  'mixstgirls',
  'idol-corp',
  'independent',
  'independent-irl'
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

  @Exclude()
  findChannel(id: ChannelId) {
    return ChannelsByGroup[this.val].findById(id)
  }
}
