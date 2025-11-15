import { UnprocessableEntityException } from '@nestjs/common'
import { Exclude } from 'class-transformer'
import { ChannelRegistrations } from '@domain/channel-registration'
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

  /**
   * merge with channel registrations
   * これによってVCharts独自のプロパティが埋まる
   * @param other channel registrations
   * @returns merged channels
   */
  @Exclude()
  merge = (registrations: ChannelRegistrations) =>
    new Channels(
      this.list.map(channel => {
        const registration = registrations.find(r =>
          r.channelId.equals(channel.basicInfo.id)
        )
        if (!registration) {
          throw new UnprocessableEntityException(
            'ChannelRegistrations not found'
          )
        }

        return new Channel({
          basicInfo: channel.basicInfo,
          contentDetails: channel.contentDetails,
          statistics: channel.statistics,
          brandingSettings: channel.brandingSettings,
          peakX: {
            group: registration.group,
            country: registration.country,
            defaultLanguage: registration.defaultLanguage,
            gender: registration.gender
          }
        })
      })
    )
}
