import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import admin from 'firebase-admin'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { VideoAggregationRepository } from '@domain/youtube/video-aggregation/VideoAggregation.repository'
import { channelConverter } from '@infra/schema/ChannelSchema'
import { videoAggregationConverter } from '@infra/schema/VideoAggregationSchema'
import { SearchChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class VideoAggregationRepositoryImpl
  implements VideoAggregationRepository
{
  private readonly COLLECTION_NAME = 'videoAggregation'
  private readonly SUB_COLLECTION_NAME = 'history'

  constructor(
    private youtubeDataApiSearchInfraService: SearchChannelsInfraService
  ) {}

  async findOne({
    where: { channelId }
  }: Parameters<VideoAggregationRepository['findOne']>[0]) {
    // TODO: impl dayjs?
    const subDoc = '2024-07'

    const videoAggregations = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(channelId.get())
      .collection(this.SUB_COLLECTION_NAME)
      .doc(subDoc)
      .withConverter(videoAggregationConverter)
      .get()

    const data = videoAggregations.data()
    if (!data) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { updatedAt, ...args } = data

    return new VideoAggregation(args)
  }

  /**
   * upsert with channel id
   *
   * double write
   * /channel/{channelId}/latestVideoAggregation
   * /videoAggregation/{channelId}/history/{year-month}
   */
  async save({
    where: { channelId },
    data
  }: Parameters<VideoAggregationRepository['save']>[0]) {
    // get sub collection doc
    const subDoc = dayjs().format('YYYY-MM')

    // first write
    await admin
      .firestore()
      .collection('channel')
      .doc(channelId.get())
      .withConverter(channelConverter)
      .set(
        {
          latestVideoAggregation: {
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
        },
        { merge: true }
      )

    // second write
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(channelId.get())
      .collection(this.SUB_COLLECTION_NAME)
      .doc(subDoc)
      .withConverter(videoAggregationConverter)
      .set({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }
}
