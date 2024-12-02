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
    id: new ChannelId('UCBiqkFJljoxAj10SoP2w2Cg'),
    title: '文野環【にじさんじの野良猫】ふみのたまき',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCRm6lqtdxs_Qo6HeL-SRQ-w'),
    title: 'レイン・パターソン／Lain Paterson【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCHBhnG2G-qN0JrrWmMO2FTA'),
    title: 'シェリン・バーガンディ -Shellin Burgundy- 【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC3lNFeJiTq6L3UWoz4g1e-A'),
    title: '卯月コウ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCcDDxnoQcezyTUzHg5uHaKg'),
    title: '四季凪アキラ / Shikinagi Akira',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC6oDys1BGgBsIC3WhG1BovQ'),
    title: 'Shizuka Rin Official',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCtnO2N4kPTXmyvedjGWdx3Q'),
    title: 'レヴィ・エリファ-Levi Elipha-',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGw7lrT-rVZCWHfdG9Frcgg'),
    title: '弦月 藤士郎 / Genzuki Tojiro【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCTIE7LM5X15NVugV7Krp9Hw'),
    title: '夢追翔のJUKE BOX',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCCVwhI5trmaSxfcze_Ovzfw'),
    title: '夢月ロア🌖Yuzuki Roa',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC48jH1ul-6HOrcSSfoR02fQ'),
    title: 'Yuhi Riri Official',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC53UDnhAAYwvNO7j_2Ju1cQ'),
    title: 'ドーラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXU7YYxy_iQd3ulXyO-zC2w'),
    title: '伏見ガク【にじさんじ所属】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCqjTqdVlvIipZXIKeCkHKUA'),
    title: 'オリバー・エバンス / Oliver Evans 【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCtpB6Bvhs1Um93ziEDACQ8g'),
    title: 'Kazaki Ch. ‐ 森中花咲 ‐',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCCHH0nWYXFZmtDS_4tvMxHQ'),
    title: 'ヤン・ナリ / Yang Nari 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCryOPk2GZ1meIDt53tL30Tw'),
    title: '鈴木勝 / Suzuki Masaru【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCerkculBD7YLc_vOGrF7tKg'),
    title: '魔使マオ -matsukai mao-',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCRqBKoKuX30ruKAq05pCeRQ'),
    title: '北小路ヒスイ / Kitakoji Hisui 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCivwPlOp0ojnMPZj5pNOPPA'),
    title: 'ソフィア・ヴァレンタイン / Sophia Valentine【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC5dJFf4m-mEcoyJRfhBljoA'),
    title: 'セラフ・ダズルガーデン / Seraph Dazzlegarden',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCUP8TmlO7NNra88AMqGU_vQ'),
    title: '小清水 透 / Koshimizu Toru【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCpJtk0myFr5WnyfsmnInP-w'),
    title: 'Hana Macchia Ch.【NIJISANJI・にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC6WFKwYptsxVue56Lx218vg'),
    title: '小柳ロウ / Koyanagi Rou【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCe22Bcwd_GCpTjLxn83zl7A'),
    title: '先斗寧 / Ponto Nei 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCfQVs_KuXeNAlGa3fb8rlnQ'),
    title: '桜凛月',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCt0clH12Xk1-Ej5PXKGfdPA'),
    title: '♥️♠️物述有栖♦️♣️',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC2OacIzd2UxGHRGhdHl1Rhw'),
    title: '早瀬 走 / Hayase Sou【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCWz0CSYCxf4MhRKPDm220AQ'),
    title: '神田笑一 / Kanda Shoichi【 にじさんじ 】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCC7rRD6P7RQcx0hKv9RQP4w'),
    title: '風楽奏斗 / Fura Kanato',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCqXxS-9x9Ha_UiH6hG4kh5Q'),
    title: '緋八マナ / Hibachi Mana【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCgZ0pH7j6c9z-pkOG3PYw1Q'),
    title: '星導ショウ / Hoshirube Sho【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCwrjITPwG4q71HzihV2C7Nw'),
    title: 'フミ/にじさんじ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7_MFM9b8hp5kuTSpa8WyOQ'),
    title: '栞葉るり / Shioriha Ruri【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCtLfA_qUqCJtjXJM2ZR_keg'),
    title: '石神のぞみ / Ishigami Nozomi【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmeyo5pRj_6PXG-CsGUuWWg'),
    title: '黒井しば【にじさんじの犬】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCllKI7VjyANuS1RXatizfLQ'),
    title: '山神 カルタ / Karuta Yamagami',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCb6ObE-XGCctO3WrjRZC-cw'),
    title: 'ルイス・キャミー',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC8SJPcLpIM3x8RdBJFfiluw'),
    title: '魁星 / Kaisei【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC_GCs6GARLxEHxy1w40d6VQ'),
    title: '家長むぎ【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCRcLAVTbmx2-iNcXSsupdNA'),
    title: '来栖 夏芽-kurusu natsume-【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCtHY-tP0dyykhTRMmnfPs_g'),
    title: '海妹四葉 / Umise Yotsuha 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCy8P3o5XlMpJGQY4WugzdNA'),
    title: '佐伯イッテツ / Saiki Ittetsu【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCWRPqA0ehhWV4Hnp27PJCkQ'),
    title: '獅子堂 あかり / Shishido Akari【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCpNH2Zk2gw3JBjWAKSyZcQQ'),
    title: 'エリー・コニファー / Eli Conifer【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCg63a3lk6PNeWhVvMRM_mrQ'),
    title: '小野町 春香 / Onomachi Haruka 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCu-rV2gPtJ-CsGxe71z_BrQ'),
    title: '五十嵐梨花 / Igarashi Rika 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCl1oLKcAq93p-pwKfDGhiYQ'),
    title: 'えま★おうがすと / Emma★August【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCeGendL8CO5RkffB6IFwHow'),
    title: 'セフィナ / Seffyna【にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('KR')
  },
  {
    id: new ChannelId('UCyXBNgCulibV9pRm3ZKpmoQ'),
    title: '榊ネス / Sakaki Ness【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCHX7YpFG8rVwhsHCx34xt7w'),
    title: '雪城眞尋/Yukishiro Mahiro【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCBi8YaVyZpiKWN3_Z0dCTfQ'),
    title: '赤羽葉子ちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChdY64fJb14Nfnbs8EGdQig'),
    title: '叢雲カゲツ / Murakumo Kagetsu【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCz89MGFBrAqwJ5xMr5weSuA'),
    title: '伊波ライ / Inami Rai【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCambvP8yxNDot4FzQc9cgiw'),
    title: '宇佐美リト / Usami Rito【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC_82HBGtvwN1hcGeOGHzUBQ'),
    title: '空星きらめ/Sorahoshi Kirame【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCmUjjW5zF1MMOhYUwwwQv9Q'),
    title: '宇志海いちご',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC0WwEfE-jOM2rzjpdfhTzZA'),
    title: '愛園 愛美/Aizono Manami',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCiA-trSZfB0i92V_-dyDqBw'),
    title: '倉持めると / Kuramochi Meruto【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UClrQ7xhRBxS_v_-WuudGKmA'),
    title: '鏑木ろこ / Kaburaki Roco【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCtAvQ5U0aXyKwm2i4GqFgJg'),
    title: '春崎エアル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCHK5wkevfaGrPr7j3g56Jmw'),
    title: '瀬戸 美夜子 - Miyako Seto',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCUtKkGKef8BYMs3h-3zQm9A'),
    title: '민수하 /Suhaスハ【NIJISANJI】',
    ...DefaultProps,
    country: new CountryCode('KR'),
    defaultLangage: new LanguageTag('ko'),
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCRWOdwLRsenx2jLaiCAIU4A'),
    title: '雨森小夜',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCUzJ90o1EjqUbk2pBAy0_aw'),
    title: 'Gilzaren III Season 2',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC1vawzfbCnRpHT9SJ5pHlHw'),
    title: '赤城ウェン / Akagi Wen【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCeK9HFcRZoTrvqcUCtccMoQ'),
    title: '渋谷ハジメのはじめ支部',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCebT4Aq-3XWb5je1S1FvR_A'),
    title: '東堂コハク/ Todo Kohaku [にじさんじ]',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCcx3crxPFi006DUhb_YU-tw'),
    title: '北見遊征 / Kitami Yusei【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCRV9d6YCYIMUszK-83TwxVA'),
    title: '轟京子/kyoko todoroki【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvmppcdYf4HOv-tFQhHHJMA'),
    title: '《にじさんじ所属の女神》モイラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCAQDFeCTVdx90GtwohwjHzQ'),
    title: '天ヶ瀬 むゆ / Amagase Muyu 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFtyinR2ZdvKK_Xgy07qXUg'),
    title: 'ミラン・ケストレル / Milan Kestrel 【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCvzVB-EYuHFXHZrObB8a_Og'),
    title: '矢車りね / Rine Yaguruma【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCiSRx1a2k-0tOg-fs6gAolQ'),
    title: '飛鳥ひな【にじさんじ所属】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkhViRjLUKgIcVpar9JiNrw'),
    title: '珠乃井ナナ / Tamanoi Nana【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCrhhJPNsOqzNIkUfTABoSpg'),
    title: 'ハユン / HaYun 【にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('KR'),
    defaultLangage: new LanguageTag('ko'),
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCClwIqTUn5LDpFucHyaAhHg'),
    title: 'イ・ロハ / LeeRoha【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCnbJ8LTbHrsRgqkxwJXCU8w'),
    title: '立伝都々 / Tachitsute Toto【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCpjypWF_wNRs9_TrjjWngpQ'),
    title: '渚トラウト / Nagisa Trout【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCtC3B1n4XMiJmrDtu1Ni5qw'),
    title: '七瀬 すず菜 / Nanase Suzuna【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCufQu4q65z63IgE4cfKs1BQ'),
    title: '語部紡',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC5ek2GWKvUKFgnKSHuuCFrw'),
    title: 'ナギ /  Nagi 【にじさんじ】',
    ...DefaultProps,
    defaultLangage: new LanguageTag('ko')
  },
  {
    id: new ChannelId('UCiJ_Um3KbfF19NzkDYLzZVQ'),
    title: '綺沙良 / Kisara【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkQ8i_cz0prqdo9jj__L93Q'),
    title: '酒寄颯馬 / Sakayori Soma【にじさんじ】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCyRkQSuhJILuGOuXk10voPg'),
    title: 'Layla Alstroemeria【NIJISANJI / にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('ID'),
    defaultLangage: new LanguageTag('id')
  },
  {
    id: new ChannelId('UCzsCWYuvPUky3-DKzphYbEw'),
    title: '司賀りこ / Shiga Riko【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCLjx3lqIkYkPCBJop8czJ2A'),
    title: 'Ban Hada | NIJISANJI',
    ...DefaultProps,
    defaultLangage: new LanguageTag('ko')
  },
  {
    id: new ChannelId('UCyJOgJhgfoVRpFjsBCUmuvg'),
    title: '梢桃音 / Kozue Mone【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCX88Pe54pxbJDSGIyGrzNdg'),
    title: 'ナ セラ / Na Sera【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC0xry7czPasj1wPxR8L0MZg'),
    title: '早乙女 ベリー / Saotome Berry【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjFu-9GHnabzSFRAYm1B9Dw'),
    title: 'Etna Crimson【NIJISANJI / にじさんじ】',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UC7hffDQLKIEG-_zoAQkMIvg'),
    title: '明楽 レイ /아키라 레이 / Ray Akira 【にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('KR')
  },
  {
    id: new ChannelId('UCnzZmBOSrQf2wDBbnsDajVw'),
    title: 'ジユ / Jiyu 【にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('KR')
  },
  {
    id: new ChannelId('UCw-kTlPnZYSHhlGMFJ17Znw'),
    title: '雲母たまこ / Kirara Tamako【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCpRXCTyNNa-MnjhK6gisnRw'),
    title: '가온 ガオン GAON 【にじさんじ】',
    ...DefaultProps,
    country: new CountryCode('KR'),
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC8Snw5i4eOJXEQqURAK17hQ'),
    title: 'Rai Galilei【NIJISANJI / にじさんじ】',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en'),
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCMzVa7B8UEdrvUGsPmSgyjA'),
    title: 'デレム・カド 【にじさんじ】',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UClS6k3w1sPwlVFqK3-yID5A'),
    title: 'ハリ / Ryu Hari 【にじさんじ】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCijNnZ-6m8g85UGaRAWuw7g'),
    title: 'Nagisa Arcinia【NIJISANJI・にじさんじ】',
    ...DefaultProps,
    defaultLangage: new LanguageTag('id')
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
