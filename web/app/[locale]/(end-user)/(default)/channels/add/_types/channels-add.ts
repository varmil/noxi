export type ChannelInfo = {
  title: string
  thumbnail: string
  subscriberCount: number
  recentLiveStreams: number
  meetsSubscriberRequirement: boolean
  meetsLiveStreamRequirement: boolean
} | null

export const countrySelects: string[] = [
  'JP',
  'US',
  'KR',
  'CN',
  'ID',
  'TH',
  'MY',
  'SG',
  'PH',
  'VN',
  'GB',
  'CA',
  'FR',
  'DE',
  'AU',
  'IN'
]

export const languageSelects: string[] = [
  'ja',
  'en',
  'ko',
  'zh-CN',
  'zh-TW',
  'id',
  'th',
  'ms',
  'tl',
  'vi',
  'fr',
  'de',
  'hi'
]
