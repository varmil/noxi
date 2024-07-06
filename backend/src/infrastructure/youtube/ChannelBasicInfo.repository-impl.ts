import { Injectable, NotImplementedException } from '@nestjs/common'
import admin from 'firebase-admin'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ChannelBasicInfoRepository } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.repository'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'
import { channelConverter } from '@infra/schema/ChannelSchema'

@Injectable()
export class ChannelBasicInfoRepositoryImpl
  implements ChannelBasicInfoRepository
{
  private readonly COLLECTION_NAME = 'channel'

  constructor() {}

  async findAll({
    limit = 50
  }: Parameters<ChannelBasicInfoRepository['findAll']>[0]) {
    const channels = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .limit(limit)
      .withConverter(channelConverter)
      .get()

    return new ChannelBasicInfos(
      channels.docs.map(doc => {
        const { id, title, description, thumbnails, publishedAt } =
          doc.data().basicInfo

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
  async save(basicInfo: Parameters<ChannelBasicInfoRepository['save']>[0]) {
    const { id, title, description, thumbnails, publishedAt } = basicInfo
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .withConverter(channelConverter)
      .set(
        {
          basicInfo: {
            id,
            title,
            description,
            thumbnails,
            publishedAt: admin.firestore.Timestamp.fromDate(publishedAt)
          },
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
