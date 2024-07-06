import { Injectable, NotImplementedException } from '@nestjs/common'
import admin from 'firebase-admin'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ChannelBasicInfoRepository } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.repository'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'
import { channelConverter } from '@infra/schema/ChannelSchema'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class ChannelBasicInfoRepositoryImpl
  implements ChannelBasicInfoRepository
{
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

    return new ChannelBasicInfos(
      channels.docs.map(doc => {
        const { id, title, description, thumbnails, publishedAt } = doc.data()
        return new ChannelBasicInfo({
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
  async save(basicInfo: ChannelBasicInfo) {
    const { id, title, description, thumbnails, publishedAt } = basicInfo
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
