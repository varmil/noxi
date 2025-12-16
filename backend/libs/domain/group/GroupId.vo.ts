import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class GroupId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Group ID must contain only lowercase alphanumeric characters and hyphens'
  })
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  // 日本語名を返すメソッド
  toJP(): string {
    const nameMapping: Record<string, string> = {
      '774inc': '774inc',
      atatakakunaru: 'あたたかくなる',
      dotlive: '.LIVE',
      'first-stage': 'First Stage Production',
      hololive: 'ホロライブ',
      'hololive-english': 'Hololive English',
      'hololive-indonesia': 'Hololive Indonesia',
      holostars: 'ホロスターズ',
      nijisanji: 'にじさんじ',
      'nijisanji-en': 'NIJISANJI EN',
      noripro: 'のりプロ',
      vspo: 'ぶいすぽっ！',
      'kizuna-ai': 'Kizuna AI',
      'neo-porte': 'Neo-Porte',
      'aogiri-high-school': '青鬼高校',
      specialite: 'Specialite',
      mixstgirls: 'MixstGirls',
      'idol-corp': 'idol Corp',
      trillionstage: 'TrillionStage',
      utatane: 'うたたね',
      varium: 'Varium',
      vividv: 'ViViD',
      voms: 'VOMS',
      independent: '個人勢VTuber',
      'independent-irl': '個人勢IRL',
      artist: 'アーティスト',
      all: '総合'
    }

    return nameMapping[this.val] || this.val
  }
}
