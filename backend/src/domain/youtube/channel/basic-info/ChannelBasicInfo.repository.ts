import { ChannelId, ChannelIds } from '@domain/youtube'

export interface ChannelBasicInfoRepository {
  findIds: (args: { limit?: number }) => Promise<ChannelIds>
  save: (id: ChannelId) => Promise<void>
}
