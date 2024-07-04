import { Injectable, NotImplementedException } from '@nestjs/common'
import admin from 'firebase-admin'
import { Channel } from '@domain/youtube/Channel.entity'
import { ChannelRepository } from '@domain/youtube/Channel.repository'
import { Channels } from '@domain/youtube/Channels.collection'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly COLLECTION_NAME = 'channel'

  constructor(
    private youtubeDataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  // TODO: fetch from Firestore, not from Data API
  async findAll({ limit = 50 }: { limit?: number }) {
    const channels = await this.youtubeDataApiSearchInfraService.getChannels({
      limit
    })
    return channels
  }

  // TODO: unique upsert with id
  async save(channel: Channel) {
    const { id, title, description, thumbnails, publishedAt } = channel
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .add({ id, title, description, thumbnails, publishedAt })
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
