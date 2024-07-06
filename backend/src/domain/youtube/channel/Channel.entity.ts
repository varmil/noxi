import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'

/**
 * 本当は全チャンネル /v3/channels を１回でも回せば
 * ChannelStatistics, BrandingSettings は
 * データとして挿入されるので、そうなったらOptional外す
 */
export class Channel {
  public readonly basicInfo: ChannelBasicInfo
  public readonly statistics?: ChannelStatistics
  public readonly brandingSettings?: BrandingSettings

  constructor(args: {
    basicInfo: ChannelBasicInfo
    statistics?: ChannelStatistics
    brandingSettings?: BrandingSettings
  }) {
    this.basicInfo = args.basicInfo
    this.statistics = args.statistics
    this.brandingSettings = args.brandingSettings
  }
}
