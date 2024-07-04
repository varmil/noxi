import { Injectable, NotImplementedException } from '@nestjs/common'
import admin from 'firebase-admin'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { channelConverter } from '@infra/schema/ChannelSchema'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly COLLECTION_NAME = 'channel'

  constructor(
    private youtubeDataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  async findAll({ limit = 50 }: { limit?: number }) {
    const channels = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .limit(limit)
      .withConverter(channelConverter)
      .get()

    return new Channels(
      channels.docs.map(doc => {
        const { id, title, description, thumbnails, publishedAt } = doc.data()
        return new Channel({
          id,
          title,
          description,
          thumbnails,
          publishedAt: publishedAt.toDate()
        })
      })
    )
  }

  // upsert with channel id
  async save(channel: Channel) {
    const { id, title, description, thumbnails, publishedAt } = channel
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .withConverter(channelConverter)
      .set({
        id,
        title,
        description,
        thumbnails,
        publishedAt: admin.firestore.Timestamp.fromDate(publishedAt),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
