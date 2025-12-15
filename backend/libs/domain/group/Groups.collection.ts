import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { Group } from './Group.entity'
import { GroupIconSrc } from './GroupIconSrc.vo'
import { GroupId } from './GroupId.vo'
import { GroupName } from './GroupName.vo'
import { GroupStrings } from './GroupStrings'

export class Groups extends Collection<Group> {
  constructor(protected readonly list: Group[]) {
    super(list)
  }

  @Exclude()
  get() {
    return this.list
  }
}

// Helper function to get group name mapping
function getGroupName(groupId: string): string {
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
    artist: 'アーティスト'
  }

  return nameMapping[groupId] || groupId
}

export const AllGroups = new Groups(
  GroupStrings.map(
    groupId =>
      new Group({
        id: new GroupId(groupId),
        name: new GroupName(getGroupName(groupId)),
        iconSrc: new GroupIconSrc(`/group/${groupId}/logo.png`)
      })
  )
)
