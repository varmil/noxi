import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'

export interface ChannelBasicInfoRepository {
  findAll: (args: { limit?: number }) => Promise<ChannelBasicInfos>
  save: (basicInfo: ChannelBasicInfo) => Promise<void>
}
