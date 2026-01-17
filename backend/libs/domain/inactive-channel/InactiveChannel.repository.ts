import { ChannelId } from '@domain/youtube'
import { InactiveChannels } from './InactiveChannels.collection'

export interface InactiveChannelRepository {
  findInactiveChannels(args: {
    inactiveMonths: number
  }): Promise<InactiveChannels>

  deleteChannelCompletely(channelId: ChannelId): Promise<void>
}
