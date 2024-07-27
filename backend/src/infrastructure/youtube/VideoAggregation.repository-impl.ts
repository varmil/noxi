import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import admin from 'firebase-admin'
import { CountryCode } from '@domain/country'
import { Monthly, TimePeriod } from '@domain/time-period'
import { ChannelId, VideoAggregations } from '@domain/youtube'
import {
  VideoAggregation,
  VideoAggregationRepository
} from '@domain/youtube/video-aggregation'
import { channelConverter } from '@infra/schema/ChannelSchema'
import { videoAggregationConverter } from '@infra/schema/VideoAggregationSchema'
import { SearchChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class VideoAggregationRepositoryImpl
  implements VideoAggregationRepository
{
  private readonly ROOT_COLLECTION_NAME = 'youtube'
  private readonly SUB1_COLLECTION_NAME = 'yt:videoAggregationByChannel'
  private readonly SUB2_COLLECTION_PREFIX = 'yt:vabc:'

  private readonly SUB_CHANNEL_COLLECTION_NAME = 'yt:channel'

  constructor(
    private youtubeDataApiSearchInfraService: SearchChannelsInfraService
  ) {}

  /**
   * これを呼ぶのは過去分をまとめて取得したいとき
   */
  async findByChannelId(
    id: Parameters<VideoAggregationRepository['findByChannelId']>[0],
    { timePeriod }: Parameters<VideoAggregationRepository['findByChannelId']>[1]
  ) {
    // const doc = dayjs().format('YYYY-MM')

    const snapshot = await this.getQueryByCollectionGroup(id, { timePeriod })
      .orderBy(admin.firestore.FieldPath.documentId(), 'desc')
      .limit(timePeriod.limit())
      .get()

    return new VideoAggregations(
      snapshot.docs.map(aggregation => {
        const { regular, short, live } = aggregation.data()
        return new VideoAggregation({
          regular,
          short,
          live
        })
      })
    )
  }

  /**
   * double write
   *
   * root/youtube/[country-code]/channel/{channelId}/latestVideoAggregation
   *
   * root/youtube/[country-code]/videoAggregationByChannel/[channelId]/monthly
   * root/youtube/[country-code]/videoAggregationByChannel/[channelId]/weekly
   * root/youtube/[country-code]/videoAggregationByChannel/[channelId]/daily
   */
  async save({
    where: { channelId, country },
    data
  }: Parameters<VideoAggregationRepository['save']>[0]) {
    // get sub collection doc
    const doc = dayjs().format('YYYY-MM')

    // first write
    await this.getChannelQuery(country)
      .doc(channelId.get())
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
    await this.getMonthlyQuery(country, channelId)
      .doc(doc)
      .set({
        ...data,
        channelId: channelId.get(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }

  private getMonthlyQuery(country: CountryCode, channelId: ChannelId) {
    return admin
      .firestore()
      .collection(this.ROOT_COLLECTION_NAME) // youtube >
      .doc(country.get()) // Country Code >
      .collection(this.SUB1_COLLECTION_NAME) // yt:videoAggregationByChannel >
      .doc(channelId.get()) // Channel Id >
      .collection(this.getSub2CollectionName(new Monthly())) // yt:vabc:monthly >
      .withConverter(videoAggregationConverter)
  }

  private getChannelQuery(country: CountryCode) {
    return admin
      .firestore()
      .collection(this.ROOT_COLLECTION_NAME) // youtube >
      .doc(country.get()) // Country Code >
      .collection(this.SUB_CHANNEL_COLLECTION_NAME) // yt:channel >
      .withConverter(channelConverter)
  }

  private getQueryByCollectionGroup(
    channelId: Parameters<VideoAggregationRepository['findByChannelId']>[0],
    { timePeriod }: Parameters<VideoAggregationRepository['findByChannelId']>[1]
  ) {
    return admin
      .firestore()
      .collectionGroup(this.getSub2CollectionName(timePeriod)) // yt:vabc:monthly
      .where('channelId', '==', channelId.get())
      .withConverter(videoAggregationConverter)
  }

  private getSub2CollectionName(timePeriod: TimePeriod) {
    return this.SUB2_COLLECTION_PREFIX + timePeriod.name()
  }
}
