import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
}

export const JPList: GroupChannel[] = [
  {
    id: new ChannelId('UCLqCmbd6bgcLaBVz3aA-68A'),
    title: 'P丸様。',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCt30jJgChL8qeT9VPadidSw'),
    title: 'しぐれうい',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC9ruVYPv7yJmV0Rh0NKA-Lw'),
    title: 'kson ONAIR',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCH4yRBPH2pDUjPeqomx8CTQ'),
    title: 'てるとくん',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCGV96w_TwvyCDusr_tmcu8A'),
    title: 'Nito Ch. 新兎わい',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCrV1Hf5r8P148idjoSfrGEQ'),
    title: 'Sakuna Ch. 結城さくな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCeLzT-7b2PBcunJplmWtoDg'),
    title: 'Patra Channel / 周防パトラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCqTGCMjeKOclEEfW8Vs7sXQ'),
    title: 'ガッチマンV',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCxCDE6QpDCy8ZB3cVetRILw'),
    title: 'ざき《役満Vtuber》',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCiR6oBbZBlAuOLInDTMzYuw'),
    title: 'ねるめろ / Nerumero',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCkPIfBOLoO0hVPG-tI2YeGg'),
    title: 'Tomari Mari channel / 兎鞠まりちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7-N7MvN5muVIHqyQx9LFbA'),
    title: 'メイカちゃんねる',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCcxbWdwrs5B782K88ppAVMg'),
    title: 'なるせ部',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCC0i9nECi4Gz7TU63xZwodg'),
    title: '白雪みしろShirayuki Mishiro',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFOsYGDAw16cr57cCqdJdVQ'),
    title: 'MKRチャンネル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCgYCMluaLpERsyNXlPOvBtA'),
    title: 'かみと-KamitoChannel-',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC0C6oq3TlGiSlDCei57hY6A'),
    title: '幕末志士チャンネル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCIdEIHpS0TdkqRkHL5OkLtA'),
    title: 'さなちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC-PYFlNwRzLcGfMzT4pSl5Q'),
    title: 'コジマ店員のホラーは恐くない',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCL7VEatXa9yBCKeM-ww8TnA'),
    title: 'NX☆くさあん',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC1oApu0S5i57d-jSKUFB_1w'),
    title: 'りちゃむ【Richamu】',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCNbpZM28AR6GXvrUcZ5v0zg'),
    title: '恋白れん / RenKohaku Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCCebCRguPlkvWemz2dKxWIA'),
    title: 'キルシュトルテ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCxm3RjoZHKNbvpiP5RW6Wlg'),
    title: '猫元パト / Patoneko Ch.',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCHXgFLFyqR-XqtxfTH3qiYA'),
    title: 'ディープブリザード',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCrKD8cwv_Wrpx22SO-VeWAQ'),
    title: 'きつねさん / Kitune-san',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCa6tqURg-QBi5QObeLl-8Mw'),
    title: 'GAMEゆうな',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCZYyhgoV314CM14zBD6vd4A'),
    title: 'バーチャル債務者youtuber天開司',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCTMgd9qnUD9qKBX5oTtD6ug'),
    title: 'バーチャルおばあちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCwoOrWNuDq3s98cWw-xz3Dg'),
    title: 'リモーネ先生',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCXUUh47D2VNtpsMjut8OHgQ'),
    title: '麻酔 Masui',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCHkgbFkEddyLE5uQMCem_aw'),
    title: 'でいすいのゲームちゃんねる',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCotQnZvYn2T-JiJTs8LrAlw'),
    title: 'チョま',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC2-hRIDWzqAnTjOxdLDmhCA'),
    title: 'おやつ@ゲームチャンネル',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCYv61z0vcKgwuDPkiCaCc2g'),
    title: 'キルハ',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCsABPC_SPKUaf7BkZGs4wbQ'),
    title: '犯罪学教室のかなえ先生',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCu5OhGQzagQkmJoOOnxnBIg'),
    title: 'ロッコク【動画解説】',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCY5M1FeR1BQNsnumsJA1epA'),
    title: 'れぷちん',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCQYy35PowPpc6ImRH1TQgcw'),
    title: 'Nora Ch. 従井ノラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCfmASINcISIoVxhZPSxvOpA'),
    title: 'けんぼー',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC_T1YqknD5yrpVlupc-ZXzg'),
    title: 'イル_フローラ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCr9p1ZjLKgfaoqNorY7PiWQ'),
    title: 'ayamy あやみちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCDhOdoqPxv96djR3tSq9NoA'),
    title: 'ショコラ大佐の秘密基地',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCWjVy9lv8oRAOaKlfoCXQJQ'),
    title: '金美館通りの藤村さん',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCeAfiVvEuyICYJW-f3GnQjQ'),
    title: 'ケリン',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCWOKF8h6kFj2pRn3rCD6nyw'),
    title: 'Pepero ch. / 猫田ぺぺろ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCE4fTYIygLvWzn-0IDM6lzw'),
    title: 'エぺ文句　タケゾー',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCXzTXNuT08FZ6CNe1gTv3Rw'),
    title: '天狼 -Tenro-',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCKa-bMYjrXEhXpaprT3KaFg'),
    title: '沢城懐',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCkNnf7-5rapGB9BjGuWmkVg'),
    title: 'さぁーもんch',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCUZ5AlC3rTlM-rA2cj5RP6w'),
    title: '神楽すず',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCnMDJ28oUjcr22UQomtYfHg'),
    title: 'じゃぽ / Japo',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCmjI6RSnoH4fp2UX_w5sPAw'),
    title: '志士雄shishio',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCNhiCwqhYJhgspDYuxC1zDw'),
    title: '未知カケルch',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCJvCDGShDAxcqe-MdwUcJjA'),
    title: '粛正罰丸',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCG60LkIPyPD6_GWeH6GSirg'),
    title: 'ボビー',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCwUNuXd6rN08SQFzlIH4Ozg'),
    title: 'なつめえりちゃんねる',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCYLp2FLXcqLUZhvrCxQmNIA'),
    title: '胡桃沢りりか',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCKBt1UvTHNmpVUDIrNZKWeQ'),
    title: '切嘛 / Kiruma',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UC77FLsC_6ZmjhZ7BA5uV_KQ'),
    title: 'くぅch. 沙倉くぅ / Sakura Qoo',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC4DYzBmjxBN1srxV-_2pcrw'),
    title: 'ナポ・レボリューション',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCabr_YRuRIixVeQy8BMsMPg'),
    title: '黒月夜桜',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCn0bPhgINwJh_2SvHqcjO7Q'),
    title: '白樺るるは',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCrG08WU5TTsVINMx7hLEmmQ'),
    title: '四宮 伊織 / SHINOMIYA Iori',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCQudM1LZYLl06QLmqtKQUiQ'),
    title: '柏木もも',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCY7Qs1UGnO3LYpNVwitTXUA'),
    title: '一翔剣ちゃんねる',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCz4jhqrCfthF8NnldZeK_rw'),
    title: 'Rica Ch. / 花宮莉歌',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGKNbtDv8OTa8559buDu-Gw'),
    title: '音魂ヒビクHibiku Otodama',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCi1pVIrFVtrRTnyaUtKcgOQ'),
    title: 'Reimu Ch. 甘兎れいむ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXF2g2N8d6xDgzcsoy8pgDA'),
    title: 'ハウラ・ヘルベル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCsAoyzNVhYYWoQpWjtDAGpw'),
    title: '東和正 / AzumaKazumasa',
    ...DefaultProps,
    gender: Gender.Male
  },
  {
    id: new ChannelId('UCn6Ufc6C9ZdGlCYTXOVFGLA'),
    title: '羽咲みく -Miku Hanesaki-',
    ...DefaultProps
  }
]
