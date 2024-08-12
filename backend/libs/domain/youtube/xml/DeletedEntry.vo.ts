import { DeletedEntryXMLSchema } from '@domain/youtube/xml/schema/DeletedEntryXMLSchema'

export class DeletedEntry {
  constructor(private readonly data: DeletedEntryXMLSchema) {
    this.data = data
  }

  get channelId() {
    return this.data.feed['at:deleted-entry']['at:by'].uri.replace(
      'https://www.youtube.com/channel/',
      ''
    )
  }

  get videoId() {
    return this.data.feed['at:deleted-entry'].ref.replace('yt:video:', '')
  }
}
