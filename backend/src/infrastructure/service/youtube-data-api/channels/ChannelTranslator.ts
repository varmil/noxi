import { type youtube_v3 } from '@googleapis/youtube'
import { z } from 'zod'
import { CountryCode } from '@domain/country'
import {
  BrandingSettings,
  Channel,
  ChannelStatistics,
  Keywords
} from '@domain/youtube'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'
import { channelAPISchema } from '@infra/service/youtube-data-api/channels/ChannelAPISchema'

export class ChannelTranslator {
  constructor(private readonly channel: youtube_v3.Schema$Channel) {}

  translate(): Channel | undefined {
    const channel = this.parse()
    if (!channel) return undefined

    const { snippet, contentDetails, statistics, brandingSettings } = channel
    const { title, description, thumbnails, publishedAt } = snippet
    const { viewCount, subscriberCount, videoCount } = statistics
    const { keywords, country } = brandingSettings.channel

    return new Channel({
      basicInfo: {
        id: channel.id,
        title,
        description,
        thumbnails,
        publishedAt: new Date(publishedAt)
      },
      contentDetails: new ContentDetails({
        relatedPlaylists: {
          uploads: contentDetails.relatedPlaylists.uploads
        }
      }),
      statistics: new ChannelStatistics({
        viewCount: Number(viewCount ?? 0),
        subscriberCount: Number(subscriberCount ?? 0),
        videoCount: Number(videoCount ?? 0)
      }),
      brandingSettings: new BrandingSettings({
        keywords: Keywords.fromString(keywords ?? ''),
        country: new CountryCode(country)
      })
    })
  }

  private parse() {
    try {
      return channelAPISchema.parse(this.channel)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log('ChannelTranslator', err.issues)
        return undefined
      } else {
        throw err
      }
    }
  }
}
