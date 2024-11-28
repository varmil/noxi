import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib/gender/Gender.vo'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  group: 'nijisanji',
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCX7YkU9nEeaoZbkVLVajcMg'),
    title: 'にじさんじ',
    ...DefaultProps,
    gender: undefined
  },
  {
    id: new ChannelId('UCSFCh5NL4qXrAy9u-u2lX3g'),
    title: 'Kuzuha Channel',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCgIfLpQvelloDi8I0Ycbwpg'),
    title: '壱百満天原サロメ / Hyakumantenbara Salome',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCspv01oxUFf_MTSipURRhkA'),
    title: 'Kanae Channel',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCD-miitqNY3nyukJ4Fnf4_A'),
    title: '月ノ美兎',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC9V3Y3_uzU5e-usObb6IE1w'),
    title: '星川サラ / Sara Hoshikawa',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCv1fFr156jc65EMiLbaLImw'),
    title: '剣持刀也',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC6wvdADTJ88OfIbJYIpAaDA'),
    title: '不破 湊 / Fuwa Minato【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCZ1xuCK1kNmn5RzPYIZop3w'),
    title: 'リゼ・ヘルエスタ -Lize Helesta-',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCoztvTULBYd3WmStqYeoHcA'),
    title: '笹木咲 / Sasaki Saku',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCHVXbQzkl3rDfsXWo8xi2qw'),
    title: 'アンジュ・カトリーナ - Ange Katrina -',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXRlIK3Cw_TJIQC5kSJJQMg'),
    title: '戌亥とこ -Inui Toko-',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCsg-YqdqQ-KFF0LNk23BY4A'),
    title: '樋口楓【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCKMYISTJAQ8xTplUPHiABlA'),
    title: '社築',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCdpUojq0KWZCN9bxXnZwz5w'),
    title: 'アルス・アルマル -ars almal- 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmovZ2th3Sqpd00F5RdeigQ'),
    title: '加賀美 ハヤト/Hayato Kagami',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC_4tXjqecqox5Uc05ncxpxg'),
    title: '椎名唯華 / Shiina Yuika',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCgmFrRcyH7d1zR9sIVQhFow'),
    title: 'ローレン・イロアス / Lauren Iroas【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCmZ1Rbthn-6Jm_qOGjYsh5A'),
    title: 'イブラヒム【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC0g1AE0DOjBYnLhkgoRWN1w'),
    title: '本間ひまわり - Himawari Honma -',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCo7TRj3cS-f_1D9ZDmuTsjw'),
    title: '町田ちま【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCt5-0i4AVHXaWJrL8Wql3mw'),
    title: '緑仙 / Ryushen',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCuep1JCrMvSxOGgGhBfJuYw'),
    title: 'フレン・E・ルスタリオ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkIimWZ9gBJRamKF0rmPU8w'),
    title: '天宮 こころ / Amamya Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCNW1Ex0r6HsWRD4LCtPwvoQ'),
    title: '三枝明那 / Saegusa Akina',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCYKP16oMX9KKPbrNgo_Kgag'),
    title: 'える / Elu【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCo2N7C-Z91waaR6lF3LL_jw'),
    title: '甲斐田 晴 / Kaida Haru【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCUc8GZfFxtmk7ZwSO7ccQ0g'),
    title: 'ニュイ・ソシエール //[Nui Sociere]',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCIG9rDtgR45VCZmYnd-4DUw'),
    title: 'ラトナ・プティ -Ratna Petit -にじさんじ所属',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkngxfPbmGyGl_RIq4FA3MQ'),
    title: '西園チグサ / Nishizono Chigusa',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjlmCrq4TP1I4xguOtJ-31w'),
    title: 'でびでび・でびる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC8C1LLhBhf_E2IBPLSDJXlQ'),
    title: '健屋花那【にじさんじ】KanaSukoya',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCPvGypSgfDkVe7JG2KygK7A'),
    title: '竜胆 尊 / Rindou Mikoto',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCL_O_HXgLJx3Auteer0n0pA'),
    title: '周央 サンゴ / Suo Sango【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1zFJrfEKvCixhsjNSb1toQ'),
    title: 'シスター・クレア -SisterClaire-',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCL34fAoFim9oHLbVzMKFavQ'),
    title: '夜見れな/yorumi rena【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCfipDDn7wY-C-SoUChgxCQQ'),
    title: '葉山舞鈴 / Ohayama Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChUJbHiTVeGrSkTdBzVfNCQ'),
    title: 'ジョー・力一 Joe Rikiichi',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCzNXpqpdvlibmNc1JpM1o4g'),
    title: 'ルンルン / Lunlun【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCsFn_ueskBkMCEyzCEqAOvg'),
    title: '花畑チャイカ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC9EjSJ8pvxtvPdxLOElv73w'),
    title: '魔界ノりりむ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCV5ZZlLjk5MKGg3L0n0vbzw'),
    title: '鷹宮リオン / Rion Takamiya',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC4l9gz3q65lTBFfFtW5LLeA'),
    title: '渡会雲雀 / Watarai Hibari',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCS-XXTgVkotkbkDnGEprXpg'),
    title: 'ましろ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1QgXt46-GEvtNjEC1paHnw'),
    title: 'グウェル・オス・ガール / Gwelu Os Gar 【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCbc8fwhdUNlqi-J99ISYu4A'),
    title: 'ベルモンド・バンデラス',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC-o-E6I3IC2q8sAoAuM6Umg'),
    title: '奈羅花 - Naraka -',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC-6rZgmxZSIbq786j3RD5ow'),
    title: 'レオス・ヴィンセント / Leos.Vincent【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCJubINhCcFXlsBwnHp0wl_g'),
    title: '舞元啓介',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCGYAYLDE7TZiiC8U6teciDQ'),
    title: '葉加瀬 冬雪 / Hakase Fuyuki',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCuvk5PilcvDECU7dDZhQiEw'),
    title: '白雪 巴/Shirayuki Tomoe',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXW4MqCQn-jCaxlX-nn-BYg'),
    title: '長尾 景 / Nagao Kei【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCIytNcoz4pWzXfLda0DoULQ'),
    title: 'エクス・アルビオ -Ex Albio-',
    ...DefaultProps,
    gender: Gender.Male
  },

  {
    id: new ChannelId('UC7_MFM9b8hp5kuTSpa8WyOQ'),
    title: '栞葉るり / Shioriha Ruri【にじさんじ】',
    ...DefaultProps
  }
]

export class Nijisanji implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
