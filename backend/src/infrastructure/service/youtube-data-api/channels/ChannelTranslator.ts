import { type youtube_v3 } from '@googleapis/youtube'
import {
  BrandingSettings,
  Channel,
  ChannelStatistics,
  Country,
  Keywords
} from '@domain/youtube'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'

export class ChannelTranslator {
  constructor() {}

  translate(channel: youtube_v3.Schema$Channel): Channel | undefined {
    const { snippet, contentDetails, statistics, brandingSettings } = channel
    const { title, description, thumbnails, publishedAt } = snippet ?? {}
    const { viewCount, subscriberCount, videoCount } = statistics ?? {}
    const { keywords, country } = brandingSettings?.channel ?? {}

    if (
      !snippet ||
      !contentDetails ||
      !statistics ||
      !brandingSettings ||
      !brandingSettings.channel ||
      !channel.id ||
      !title ||
      !description ||
      !thumbnails ||
      !publishedAt ||
      !contentDetails.relatedPlaylists?.uploads ||
      !country
    ) {
      console.log(
        '[NULL] Channels',
        'contentDetails?.relatedPlaylists?.uploads',
        !!contentDetails?.relatedPlaylists?.uploads,
        'brandingSettings?.channel',
        !!brandingSettings?.channel,
        'channel.id',
        !!channel.id,
        'title',
        !!title,
        'description',
        !!description,
        'thumbnails',
        !!thumbnails,
        'publishedAt',
        !!publishedAt,
        'contentDetails',
        !!contentDetails,
        'country',
        !!country
      )
      return undefined
    }

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
        country: new Country(country)
      })
    })
  }
}
