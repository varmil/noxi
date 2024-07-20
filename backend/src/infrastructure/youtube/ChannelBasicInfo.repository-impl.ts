import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import { ChannelId, ChannelIds } from '@domain/youtube'
import { ChannelBasicInfoRepository } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.repository'
import { channelConverter } from '@infra/schema/ChannelSchema'

@Injectable()
export class ChannelBasicInfoRepositoryImpl
  implements ChannelBasicInfoRepository
{
  private readonly COLLECTION_NAME = 'channel'

  constructor() {}

  async findIds({
    limit = 50
  }: Parameters<ChannelBasicInfoRepository['findIds']>[0]) {
    const channels = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .select()
      .limit(limit)
      .withConverter(channelConverter)
      .get()

    return new ChannelIds(channels.docs.map(doc => new ChannelId(doc.id)))
  }

  // async save(id: Parameters<ChannelBasicInfoRepository['save']>[0]) {
  //   const idStr = id.get()
  //   await admin
  //     .firestore()
  //     .collection(this.COLLECTION_NAME)
  //     .doc(idStr)
  //     .withConverter(channelConverter)
  //     .set(
  //       {
  //         updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  //         expireAt: getExpireAt()
  //       },
  //       { merge: true }
  //     )
  // }
}
