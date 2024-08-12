import { ChannelId } from '@domain/youtube/channel'
import { VideoId } from '@domain/youtube/video'
import { UpdatedEntryXMLSchema } from '@domain/youtube/xml/schema/UpdatedEntryXMLSchema'

export class UpdatedEntry {
  constructor(private readonly data: UpdatedEntryXMLSchema) {
    this.data = data
  }

  get channelId() {
    return new ChannelId(this.data.feed.entry['yt:channelId'])
  }

  get videoId() {
    return new VideoId(this.data.feed.entry['yt:videoId'])
  }
}
