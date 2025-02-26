const searchParams = new URLSearchParams({
  dimension: 'super-chat',
  period: 'last24Hours'
})
export const ChannelsRankingDefaultUrl = `/youtube/channels/ranking?${searchParams.toString()}`
