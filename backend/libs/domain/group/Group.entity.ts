import { BadRequestException } from '@nestjs/common'
import { Exclude } from 'class-transformer'
import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export const GroupStrings = [
  '774inc',
  'atatakakunaru',
  'dotlive',
  'first-stage',
  'hololive',
  'hololive-english',
  'hololive-indonesia',
  'holostars',
  'nijisanji',
  'nijisanji-en',
  'noripro',
  'vspo',
  'kizuna-ai',
  'neo-porte',
  'aogiri-high-school',
  'specialite',
  'mixstgirls',
  'idol-corp',
  'trillionstage',
  'utatane',
  'varium',
  'vividv',
  'voms',
  'independent',
  'independent-irl',
  'artist'
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

  @Exclude()
  toJP() {
    switch (this.val) {
      case 'hololive':
        return 'ホロライブ'
      case 'nijisanji':
        return 'にじさんじ'
      case 'vspo':
        return 'ぶいすぽっ'
      case 'kizuna-ai':
        return 'Kizuna AI'
      case 'independent':
        return '個人勢VTuber'
      default:
        throw new BadRequestException(
          'Unsupported group to translate into Japanese'
        )
    }
  }
}
