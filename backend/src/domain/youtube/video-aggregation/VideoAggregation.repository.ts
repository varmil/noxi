import { CountryCode } from '@domain/country'
import { TimePeriod } from '@domain/time-period'
import { ChannelId } from '@domain/youtube/channel'
import {
  VideoAggregation,
  VideoAggregations
} from '@domain/youtube/video-aggregation'

export interface VideoAggregationRepository {
  findAllByChannelId: (
    id: ChannelId,
    args: { timePeriod: TimePeriod }
  ) => Promise<VideoAggregations | null>

  save: (args: {
    where: { channelId: ChannelId; country: CountryCode }
    data: VideoAggregation
  }) => Promise<void>
}
