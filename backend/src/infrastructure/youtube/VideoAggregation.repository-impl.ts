import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import admin from 'firebase-admin'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'
import { VideoAggregationRepository } from '@domain/youtube/video-aggregation/VideoAggregation.repository'
import { videoAggregationConverter } from '@infra/schema/VideoAggregationSchema'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class VideoAggregationRepositoryImpl
  implements VideoAggregationRepository
{
  private readonly COLLECTION_NAME = 'videoAggregation'
  private readonly SUB_COLLECTION_NAME = 'history'

  constructor(
    private youtubeDataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  async findOne({
    where: { channelId }
  }: Parameters<VideoAggregationRepository['findOne']>[0]) {
    // TODO: impl dayjs?
    const subDoc = '2024-07'

    const videoAggregations = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(channelId)
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

  // async findAll({
  //   where: { channelId },
  //   limit = 30
  // }: Parameters<VideoAggregationRepository['findAll']>[0]) {
  //   const videoAggregations = await admin
  //     .firestore()
  //     .collection(this.COLLECTION_NAME)
  //     .where('channelId', 'in', [...new Set(channelId)])
  //     .limit(limit)
  //     .withConverter(videoAggregationConverter)
  //     .get()
  //   return new VideoAggregations(
  //     videoAggregations.docs.map(doc => {
  //       const {
  //         averageViews,
  //         uploadFrequency,
  //         liveFrequency,
  //         averageEngagementRate
  //       } = doc.data()
  //       return new VideoAggregation({
  //         averageViews,
  //         uploadFrequency,
  //         liveFrequency,
  //         averageEngagementRate
  //       })
  //     })
  //   )
  // }

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
    const {
      averageViews,
      uploadFrequency,
      liveFrequency,
      averageEngagementRate
    } = data

    // get sub collection doc
    const subDoc = dayjs().format('YYYY-MM')

    // TODO: first write
    await admin
      .firestore()
      .collection('channel')
      .doc(channelId)
      // .withConverter(videoAggregationConverter)
      .set(
        {
          latestVideoAggregation: {
            averageViews,
            uploadFrequency,
            liveFrequency,
            averageEngagementRate,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
        },
        { merge: true }
      )

    // second write
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(channelId)
      .collection(this.SUB_COLLECTION_NAME)
      .doc(subDoc)
      .withConverter(videoAggregationConverter)
      .set({
        averageViews,
        uploadFrequency,
        liveFrequency,
        averageEngagementRate,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }
}
