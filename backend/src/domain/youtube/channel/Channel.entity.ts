import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { Country } from '@domain/youtube/channel/branding-settings/Country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'

/**
 * 本当は全チャンネル /v3/channels を１回でも回せば
 * ChannelStatistics, BrandingSettings は
 * データとして挿入されるので、そうなったらOptional外す
 */
export class Channel {
  public readonly basicInfo: ChannelBasicInfo
  public readonly statistics: ChannelStatistics
  public readonly brandingSettings?: BrandingSettings

  constructor(args: {
    basicInfo: ChannelBasicInfo
    statistics?: ChannelStatistics
    brandingSettings?: BrandingSettings
  }) {
    this.basicInfo = args.basicInfo
    this.statistics =
      args.statistics ??
      new ChannelStatistics({ viewCount: 0, subscriberCount: 0, videoCount: 0 })
    this.brandingSettings =
      args.brandingSettings ??
      new BrandingSettings({
        keywords: new Keywords([]),
        country: new Country()
      })
  }
}
