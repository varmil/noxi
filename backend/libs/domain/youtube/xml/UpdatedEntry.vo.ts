import { UpdatedEntryXMLSchema } from '@domain/youtube/xml/schema/UpdatedEntryXMLSchema'

export class UpdatedEntry {
  constructor(private readonly data: UpdatedEntryXMLSchema) {
    this.data = data
  }

  get channelId() {
    return this.data.feed.entry['yt:channelId']
  }

  get videoId() {
    return this.data.feed.entry['yt:videoId']
  }
}
