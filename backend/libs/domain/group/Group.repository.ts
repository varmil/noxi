import { Group } from '@domain/group'
import { ChannelId, VideoId } from '@domain/youtube'

export interface GroupRepository {
  findOne: (args: {
    where: {
      channelId?: ChannelId
      videoId?: VideoId
    }
  }) => Promise<Group | null>
}
