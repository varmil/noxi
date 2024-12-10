import { Exclude } from 'class-transformer'
import {
  BrandingSettings,
  ChannelStatistics,
  ChannelBasicInfo,
  ContentDetails,
  PeakXChannelProps
} from '@domain/youtube/channel'

/**
 * Youtube > Channel
 */
export class Channel {
  public readonly basicInfo: ChannelBasicInfo
  @Exclude()
  public readonly contentDetails: ContentDetails
  public readonly statistics: ChannelStatistics
  @Exclude()
  public readonly brandingSettings: BrandingSettings
  /**
   *  * undefined when fetch from Data API
   *  * filled    when fetch from Prisma
   */
  public readonly peakX?: PeakXChannelProps

  constructor(args: {
    basicInfo: ChannelBasicInfo
    contentDetails: ContentDetails
    statistics: ChannelStatistics
    brandingSettings: BrandingSettings
    peakX?: PeakXChannelProps
  }) {
    this.basicInfo = args.basicInfo
    this.contentDetails = args.contentDetails
    this.statistics = args.statistics
    this.brandingSettings = args.brandingSettings
    this.peakX = args.peakX
  }
}
