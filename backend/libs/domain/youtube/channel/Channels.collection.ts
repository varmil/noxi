import { Exclude } from 'class-transformer'
import { Collection } from '@domain/lib/Collection'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelIds } from '@domain/youtube/channel/ChannelIds.collection'

export class Channels extends Collection<Channel> {
  constructor(protected readonly list: Channel[]) {
    super(list)
  }

  @Exclude()
  ids = () => new ChannelIds(this.list.map(channel => channel.basicInfo.id))

  @Exclude()
  selectWithAtLeastNVideos = (n: number) =>
    new Channels(
      this.list.filter(channel => {
        const ok = channel.statistics.videoCount >= n
        if (!ok) console.log('[MIN_N] title', channel.basicInfo.title)
        return ok
      })
    )
}
