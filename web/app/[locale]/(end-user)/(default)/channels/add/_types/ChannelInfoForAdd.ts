export type ChannelInfo = {
  title: string
  thumbnail: string
  subscriberCount: number
  recentLiveStreams: number
  meetsSubscriberRequirement: boolean
  meetsLiveStreamRequirement: boolean
} | null
