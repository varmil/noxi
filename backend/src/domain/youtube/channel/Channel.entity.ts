import { BrandingSettings, ChannelStatistics } from '@domain/youtube/channel'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'

/**
 * 本当は全チャンネル /v3/channels を１回でも回せば
 * ChannelStatistics, BrandingSettings は
 * データとして挿入されるので、そうなったらOptional外す
 */
export class Channel {
  public readonly basicInfo: ChannelBasicInfo
  public readonly contentDetails: ContentDetails
  public readonly statistics: ChannelStatistics
  public readonly brandingSettings: BrandingSettings

  constructor(args: {
    basicInfo: ChannelBasicInfo
    contentDetails: ContentDetails
    statistics: ChannelStatistics
    brandingSettings: BrandingSettings
  }) {
    this.basicInfo = args.basicInfo
    this.contentDetails = args.contentDetails
    this.statistics = args.statistics
    this.brandingSettings = args.brandingSettings
  }
}
