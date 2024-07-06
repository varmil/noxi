import { ChannelBasicInfo } from '@domain/youtube/channel/ChannelBasicInfo.entity'
import { ChannelBasicInfos } from '@domain/youtube/channel/ChannelBasicInfos.collection'

export interface ChannelBasicInfoRepository {
  findAll: (args: { limit?: number }) => Promise<ChannelBasicInfos>
  save: (basicInfo: ChannelBasicInfo) => Promise<void>
}
