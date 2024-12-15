import { CountryCode, LanguageTag } from '@domain/country'
import {
  GroupChannel,
  GroupChannels
} from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId, ChannelIds } from '@domain/youtube'

const DefaultProps = {
  country: new CountryCode('JP'),
  defaultLangage: new LanguageTag('ja'),
  gender: Gender.Female
}

const List: GroupChannel[] = [
  {
    id: new ChannelId('UCp6993wxpyDPHUpavwDFqgg'),
    title: 'SoraCh. ときのそらチャンネル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCDqI2jOz0weumE8s7paEk6g'),
    title: 'Roboco Ch. - ロボ子',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFTLzh12_nrtzqBPsTCqenA'),
    title: 'アキ・ローゼンタール',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1CfXB_kRs3C-zaeTG3oGyg'),
    title: 'HAACHAMA Ch 赤井はあと',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCdn5BQ06XqgXoAxIhbqw5Rg'),
    title: 'フブキCh。白上フブキ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCQ0UDLQCjY0rmuxCDE38FGg'),
    title: 'Matsuri Channel 夏色まつり',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCXTpFs_3PqI41qX2d9tL2Rw'),
    title: 'Shion Ch. 紫咲シオン',
    ...DefaultProps
  },

  {
    id: new ChannelId('UC7fk0CB07ly8oSl0aqKkqFg'),
    title: 'Nakiri Ayame Ch. 百鬼あやめ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1suqwovbL1kzsoaZgFZLKg'),
    title: 'Choco Ch. 癒月ちょこ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvzGlP9oQwU--Y0r9id_jnA'),
    title: 'Subaru Ch. 大空スバル',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC0TXe_LYZ4scaW2XMyi5_kw'),
    title: 'AZKi Channel',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCp-5t9SrOQwXMU7iIjQfARg'),
    title: 'Mio Channel 大神ミオ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC-hM6YJuNYVAmUWxeIr9FeA'),
    title: 'Miko Ch. さくらみこ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvaTdHTWBGv3MKj3KVqJVCw'),
    title: 'Okayu Ch. 猫又おかゆ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChAnqc_AY5_I3Px5dig3X1Q'),
    title: 'Korone Ch. 戌神ころね',
    ...DefaultProps
  },

  {
    id: new ChannelId('UC5CwaMl1eIgY8h02uZw7u8A'),
    title: 'Suisei Channel',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1DCedRgGHBdm81E1llLhOQ'),
    title: 'Pekora Ch. 兎田ぺこら',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCvInZx9h3jC2JzsIzoOebWg'),
    title: '不知火フレア',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCdyqAaZDKHXg4Ahi7VENThQ'),
    title: 'Noel Ch. 白銀ノエル',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCCzUftO8KOVkV4wQG1vkUvg'),
    title: 'Marine Ch. 宝鐘マリン',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCZlDXzGoo7d44bwdNObFacg'),
    title: 'Kanata Ch. 天音かなた',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCqm3BQLlJfvkTsX_hvm0UmA'),
    title: 'Watame Ch. 角巻わため',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1uv2Oq6kNxgATlCiez59hw'),
    title: 'Towa Ch. 常闇トワ',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCa9Y57gfeY0Zro_noHRVrnw'),
    title: 'Luna Ch. 姫森ルーナ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFKOVgVbGmX65RxO3EtH3iw'),
    title: 'Lamy Ch. 雪花ラミィ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCAWSyEs_Io8MtpY3m-zqILA'),
    title: 'Nene Ch. 桃鈴ねね',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCUKD-uaobj9jiqB-VXt71mA'),
    title: 'Botan Ch. 獅白ぼたん',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCK9V2B22uJYu3N7eR_BT9QA'),
    title: 'Polka Ch. 尾丸ポルカ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCENwRMx5Yh42zWpzURebzTw'),
    title: 'Laplus Ch. ラプラス・ダークネス',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCs9_O1tRPMQTHQ-N_L6FU2g'),
    title: 'Lui Ch. 鷹嶺ルイ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC6eWCld0KwmyHFbAqK3V-Rw'),
    title: 'Koyori Ch. 博衣こより',
    ...DefaultProps
  },

  {
    id: new ChannelId('UCIBY1ollUsauvVi4hW4cumw'),
    title: 'Chloe Ch. 沙花叉クロヱ',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC_vMYWcDjmfdpH6r4TTn1MQ'),
    title: 'Iroha Ch. 風真いろは',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCJFZiqLMntJufDCHc6bQixg'),
    title: 'ホロライブ公式',
    ...DefaultProps,
    gender: Gender.Nonbinary
  },

  /**
   * ReGLOSS
   */
  {
    id: new ChannelId('UCMGfV7TVTmHhEErVJg1oHBQ'),
    title: 'Ao Ch. 火威青 ‐ ReGLOSS',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCWQtYtq9EOB4-I5P-3fh8lA'),
    title: 'Kanade Ch. 音乃瀬奏 ‐ ReGLOSS',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCtyWhCj3AqKh2dXctLkDtng'),
    title: 'Ririka Ch. 一条莉々華 ‐ ReGLOSS',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCdXAk5MpyLD8594lm_OvtGQ'),
    title: 'Raden Ch. 儒烏風亭らでん ‐ ReGLOSS',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC1iA6_NT4mtAcIII6ygrvCw'),
    title: 'Hajime Ch. 轟はじめ ‐ ReGLOSS',
    ...DefaultProps
  },

  /**
   * FLOW GLOW
   */
  {
    id: new ChannelId('UC9LSiN9hXI55svYEBrrK-tw'),
    title: 'Riona Ch. 響咲リオナ - FLOW GLOW',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCuI_opAVX6qbxZY-a-AxFuQ'),
    title: 'Niko Ch. 虎金妃笑虎 - FLOW GLOW',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCjk2nKmHzgH5Xy-C5qYRd5A'),
    title: 'Su Ch. 水宮枢 - FLOW GLOW',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCKMWFR6lAstLa7Vbf5dH7ig'),
    title: 'Chihaya Ch. 輪堂 千速 - FLOW GLOW',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCGzTVXqMQHa4AgJVJIVvtDQ'),
    title: 'Vivi Ch. 綺々羅々ヴィヴィ - FLOW GLOW',
    ...DefaultProps
  }
]

export class Hololive implements GroupChannels {
  channelIds(): ChannelIds {
    return new ChannelIds(List.map(c => c.id))
  }
  findById(id: ChannelId) {
    return List.find(c => c.id.equals(id))
  }
}
