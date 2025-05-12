export type Dimension =
  | ChannelsRankingDimension
  | StreamRankingDimension
  | MostCheeredDimension
  | TopFansDimension

export type ChannelsRankingDimension = 'super-chat' | 'subscriber'
export type StreamRankingDimension = 'concurrent-viewer' | 'super-chat'
export type MostCheeredDimension = 'most-cheered'
export type TopFansDimension = 'top-fans'
